'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import styles from './Cube.module.scss'

const Cube = () => {
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!boxRef.current) return
    const container = boxRef.current

    // 기존에 생성된 canvas가 있다면 싹 제거 (Next.js 중복 실행 방지)
    container.innerHTML = ''

    // 1. Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 300 / 200, 0.1, 1000)
    camera.position.z = 4

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(300, 200)
    container.appendChild(renderer.domElement)

    // 3. Geometry & Material & Mesh
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
    const material = new THREE.MeshNormalMaterial()
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // 4. GSAP Animation
    const tween = gsap.to(cube.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 2,
      duration: 5,
      repeat: -1,
      ease: 'none',
    })

    // 5. Render Loop (aniID 변수를 스코프 상단에 선언)
    let aniID: number
    const animate = () => {
      aniID = requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    // 6. Cleanup
    return () => {
      cancelAnimationFrame(aniID)
      tween.kill() // GSAP 애니메이션 종료

      geometry.dispose()
      material.dispose()
      renderer.dispose()

      container.innerHTML = ''
    }
  }, [])

  return <div className={styles.cube} ref={boxRef} />
}

export default Cube
