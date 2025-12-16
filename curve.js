let c = document.getElementById("c")
let x = c.getContext("2d")

let w = c.width = window.innerWidth
let h = c.height = window.innerHeight

let p0 = { x:w*0.15, y:h*0.6 }
let p3 = { x:w*0.85, y:h*0.6 }

let p1 = { x:w*0.35, y:h*0.3 }
let p2 = { x:w*0.65, y:h*0.3 }

let v1 = { x:0, y:0 }
let v2 = { x:0, y:0 }

let t1 = { x:p1.x, y:p1.y }
let t2 = { x:p2.x, y:p2.y }

let k = 0.04
let d = 0.85

window.addEventListener("mousemove", e => {
  t1.x = e.clientX - w*0.15
  t1.y = e.clientY
  t2.x = e.clientX + w*0.15
  t2.y = e.clientY
})

function bz(t,a,b,c,d){
  let u = 1 - t
  let tt = t*t
  let uu = u*u
  return {
    x: uu*u*a.x + 3*uu*t*b.x + 3*u*tt*c.x + tt*t*d.x,
    y: uu*u*a.y + 3*uu*t*b.y + 3*u*tt*c.y + tt*t*d.y
  }
}

function tg(t,a,b,c,d){
  let u = 1 - t
  return {
    x: 3*u*u*(b.x-a.x) + 6*u*t*(c.x-b.x) + 3*t*t*(d.x-c.x),
    y: 3*u*u*(b.y-a.y) + 6*u*t*(c.y-b.y) + 3*t*t*(d.y-c.y)
  }
}

function step(){
  let ax1 = -k*(p1.x-t1.x) - d*v1.x
  let ay1 = -k*(p1.y-t1.y) - d*v1.y
  v1.x += ax1
  v1.y += ay1
  p1.x += v1.x
  p1.y += v1.y

  let ax2 = -k*(p2.x-t2.x) - d*v2.x
  let ay2 = -k*(p2.y-t2.y) - d*v2.y
  v2.x += ax2
  v2.y += ay2
  p2.x += v2.x
  p2.y += v2.y
}

function draw(){
  x.clearRect(0,0,w,h)

  x.beginPath()
  for(let i=0;i<=1;i+=0.01){
    let p = bz(i,p0,p1,p2,p3)
    if(i===0) x.moveTo(p.x,p.y)
    else x.lineTo(p.x,p.y)
  }
  x.strokeStyle="#ffffff"
  x.lineWidth=2
  x.stroke()

  for(let i=0;i<=1;i+=0.08){
    let p = bz(i,p0,p1,p2,p3)
    let g = tg(i,p0,p1,p2,p3)

    let m = Math.hypot(g.x,g.y)
    let l = Math.min(28, m*0.06)

    g.x /= m
    g.y /= m

    let ex = p.x + g.x*l
    let ey = p.y + g.y*l

    let a = Math.atan2(g.y,g.x)
    let s = 6

    x.beginPath()
    x.moveTo(p.x,p.y)
    x.lineTo(ex,ey)
    x.lineTo(ex - Math.cos(a-0.5)*s, ey - Math.sin(a-0.5)*s)
    x.moveTo(ex,ey)
    x.lineTo(ex - Math.cos(a+0.5)*s, ey - Math.sin(a+0.5)*s)
    x.strokeStyle="#00ffaa"
    x.stroke()
  }

  let ps = [p0,p1,p2,p3]
  let ns = ["P₀","P₁","P₂","P₃"]

  for(let i=0;i<4;i++){
    let p = ps[i]
    x.beginPath()
    x.arc(p.x,p.y,7,0,Math.PI*2)
    x.fillStyle="#ff5555"
    x.fill()

    x.fillStyle="#ffffff"
    x.font="14px Arial"
    x.fillText(ns[i], p.x-10, p.y-12)
  }
}

function loop(){
  step()
  draw()
  requestAnimationFrame(loop)
}

loop()
