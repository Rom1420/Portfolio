import { Component, OnDestroy, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
  private clock!: THREE.Clock;
  private clips: THREE.AnimationClip[] = [];
  private animationId!: number;
  private isRunning = false;
  private resizeTimeout!: ReturnType<typeof setTimeout>;
  private boundOnWindowResize = this.onWindowResize.bind(this);

  ngOnInit() {}

  createThreeJsScene(): void {
    const canvasContainer = document.getElementById('canvas-container');
    const canvas = document.getElementById('canvas-box') as HTMLCanvasElement;

    if (!canvasContainer || !canvas) {
      return;
    }

    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);

    const loader = new GLTFLoader();
    loader.load(
      'assets/models/planet.gltf',
      (gltf) => {
        const model = gltf.scene;
        model.rotation.x = Math.PI / 2;
        this.scene.add(model);

        this.camera = gltf.cameras[0] as THREE.PerspectiveCamera;
        this.camera.position.y += 1.5;
        if (this.camera) {
          this.camera.aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight;
          this.camera.updateProjectionMatrix();

          this.clips = gltf.animations;
          this.mixer = new THREE.AnimationMixer(model);
          this.clips.forEach((clip) => {
            this.mixer.clipAction(clip).play();
          });

          window.addEventListener('resize', this.boundOnWindowResize);
          this.setVisibility(true);
          this.startAnimationLoop();
        }
      },
      undefined,
      (error) => {
        console.error('An error happened', error);
      }
    );
  }

  private startAnimationLoop(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.clock.start();

    const animate = () => {
      if (!this.isRunning) return;
      const delta = this.clock.getDelta();
      this.mixer?.update(delta);
      this.renderer.render(this.scene, this.camera);
      this.animationId = requestAnimationFrame(animate);
    };
    this.animationId = requestAnimationFrame(animate);
  }

  private stopAnimationLoop(): void {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  onWindowResize(): void {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      const canvasContainer = document.getElementById('canvas-container');
      if (canvasContainer && this.camera && this.renderer) {
        this.camera.aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
      }
    }, 150);
  }

  cleanupScene(): void {
    this.setVisibility(false);
    this.stopAnimationLoop();
  }

  resumeScene(): void {
    if (!this.renderer) return;
    this.setVisibility(true);
    this.startAnimationLoop();
  }

  ngOnDestroy(): void {
    this.stopAnimationLoop();
    if (this.scene) {
      this.scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((m) => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    }
    this.renderer?.dispose();
    clearTimeout(this.resizeTimeout);
    window.removeEventListener('resize', this.boundOnWindowResize);
  }

  setVisibility(isVisible: boolean): void {
    const element = document.getElementById('canvas-container');
    if (element) {
      if (isVisible) {
        element.classList.add('visible');
        element.classList.remove('invisible');
      } else {
        element.classList.add('invisible');
        element.classList.remove('visible');
      }
    }
  }
}
