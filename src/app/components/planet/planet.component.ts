import { Component, OnDestroy, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit, OnDestroy {
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private mixer!: THREE.AnimationMixer;
  private animationId!: number;
  private observer!: MutationObserver;

  ngOnInit() {
    this.createThreeJsScene();
    this.addMutationObserver();
  }

  createThreeJsScene(): void {
    const canvasContainer = document.getElementById('canvas-container');
    const canvas = document.getElementById('canvas-box') as HTMLCanvasElement;

    if (!canvasContainer || !canvas) {
      return;
    }

    this.scene = new THREE.Scene();

    // Configure le rendu
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);

    const clock = new THREE.Clock();
    
    const loader = new GLTFLoader();
    loader.load(
      'assets/planet.gltf',
      (gltf) => {
        const model = gltf.scene;
        model.rotation.x = Math.PI / 2; 
        this.scene.add(model);

        // Récupére la caméra du modèle
        this.camera = gltf.cameras[0] as THREE.PerspectiveCamera;
        this.camera.position.y += 1.5
        if (this.camera) {
          // Utilise la caméra du modèle
          this.camera.aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight;
          this.camera.updateProjectionMatrix();

          // Configurer l'animation
          this.mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach((clip) => {
            this.mixer?.clipAction(clip).play();
          });

          // Initialise le rendu de la scène avec le modèle visible
          this.renderer.render(this.scene, this.camera);

          // Animation de la scène
          const animate = () => {
            const delta = clock.getDelta();
            this.mixer?.update(delta);
            this.renderer.render(this.scene, this.camera);
            this.animationId = requestAnimationFrame(animate);
          };
          this.animationId = requestAnimationFrame(animate);

          // Gére le redimensionnement de la fenêtre
          window.addEventListener('resize', this.onWindowResize.bind(this));
        }
      },
      (xhr) => {
        // Optional: handle progress
      },
      (error) => {
        console.error('An error happened', error);
      }
    );
  }

  addMutationObserver(): void {
    const targetNode = document.getElementById('canvas-container');
    if (!targetNode) return;

    this.observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const element = mutation.target as HTMLElement;
          if (element.classList.contains('hidden')) {
            this.cleanupScene();
          } else {
            this.createThreeJsScene();
          }
        }
      }
    });

    this.observer.observe(targetNode, { attributes: true });
  }

  onWindowResize(): void {
    const canvasContainer = document.getElementById('canvas-container');
    if (canvasContainer && this.camera && this.renderer) {
      this.camera.aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    }
  }

  cleanupScene(): void {
    if (this.scene) {
      this.scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          }
        }
      });
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.mixer) {
      this.mixer.stopAllAction();
    }
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  ngOnDestroy(): void {
    this.cleanupScene();
    window.removeEventListener('resize', this.onWindowResize);
  }
}