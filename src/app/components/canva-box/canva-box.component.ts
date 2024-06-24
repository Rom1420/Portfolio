import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'canva-box',
  templateUrl: './canva-box.component.html',
  styleUrls: ['./canva-box.component.scss']
})
export class CanvaBoxComponent implements OnInit {

  ngOnInit() {
    this.createThreeJsScene();
  }

  createThreeJsScene(): void {
    const canvasContainer = document.getElementById('canvas-container');
    const canvas = document.getElementById('canvas-box') as HTMLCanvasElement;

    if (!canvasContainer || !canvas) {
      return;
    }

    const scene = new THREE.Scene();

    /*  Configurer les lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.3);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);
*/

    // Configurer le rendu
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);

    let mixer: THREE.AnimationMixer | undefined;

    // Charger le modèle GLTF
    const loader = new GLTFLoader();
    loader.load(
      'assets/planet.gltf',
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        const camera = gltf.cameras[0] as THREE.PerspectiveCamera;
        if(camera){
          camera.aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight;
          camera.updateProjectionMatrix();

          // Configurer les contrôles
          const controls = new OrbitControls(camera, renderer.domElement);
          controls.update();

          mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach((clip) => {
            mixer?.clipAction(clip).play();
          });

          const animate = () => {
            const delta = clock.getDelta();
            mixer?.update(delta);
            controls.update();
            renderer.render(scene, camera);
          };

          renderer.setAnimationLoop(animate);

          window.addEventListener('resize', () => {
            camera.aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
          });
        }
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('An error happened', error);
      }
    );

    const clock = new THREE.Clock();
  }
}
