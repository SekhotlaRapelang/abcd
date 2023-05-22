function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  const vehicleColors = [
    0xa52523,
    0xef2d56,
    0x0ad3ff,
    0xff9f1c /*0xa52523, 0xbdb638, 0x78b14b*/
  ];
  

    const wheelGeometry = new THREE.BoxGeometry(12, 33, 12);
  const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });

  const config = {
    showHitZones: false,
  };

import * as THREE from'three';

export function Wheel() {
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel.position.z = 45;
    wheel.position.y = 15;
    wheel.castShadow = false;
    wheel.receiveShadow = false;
    return wheel;
  }
  export function getTruckFrontTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext("2d");
  
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 32, 32);
  
    context.fillStyle = "#666666";
    context.fillRect(0, 5, 32, 10);
  
    return new THREE.CanvasTexture(canvas);
  }
  
  export function getTruckSideTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext("2d");
  
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 32, 32);
  
    context.fillStyle = "#666666";
    context.fillRect(17, 5, 15, 10);
  
    return new THREE.CanvasTexture(canvas);
  }
  
  export function Truck() {
    const truck = new THREE.Group();
    const color = pickRandom(vehicleColors);
  
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(100, 25, 5),
      new THREE.MeshLambertMaterial({ color: 0xb4c6fc })
    );
    base.position.z = 50;
    base.position.y = 15;
    truck.add(base);
  
    const cargo = new THREE.Mesh(
      new THREE.BoxGeometry(75, 35, 40),
      new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    cargo.position.x = -15;
    cargo.position.z = 68;
    cargo.position.y = 18;
    cargo.castShadow = true;
    cargo.receiveShadow = true;
    truck.add(cargo);
  
    const truckFrontTexture = getTruckFrontTexture();
    truckFrontTexture.center = new THREE.Vector2(0.5, 0.5);
    truckFrontTexture.rotation = Math.PI / 2;
  
    const truckLeftTexture = getTruckSideTexture();
    truckLeftTexture.flipY = false;
  
    const truckRightTexture = getTruckSideTexture();
  
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(25, 30, 30), [
      new THREE.MeshLambertMaterial({ color, map: truckFrontTexture }),
      new THREE.MeshLambertMaterial({ color }), // back
      new THREE.MeshLambertMaterial({ color, map: truckLeftTexture }),
      new THREE.MeshLambertMaterial({ color, map: truckRightTexture }),
      new THREE.MeshLambertMaterial({ color }), // top
      new THREE.MeshLambertMaterial({ color }) // bottom
    ]);
    cabin.position.x = 40;
    cabin.position.z = 60;
    cabin.position.y = 15;
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    truck.add(cabin);
  
    const backWheel = Wheel();
    backWheel.position.x = -30;
    truck.add(backWheel);
  
    const middleWheel = Wheel();
    middleWheel.position.x = 10;
    truck.add(middleWheel);
  
    const frontWheel = Wheel();
    frontWheel.position.x = 38;
    truck.add(frontWheel);
  
    return truck;
  }