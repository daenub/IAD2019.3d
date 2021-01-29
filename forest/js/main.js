const $ = (s) => document.querySelector(s)

const map = (value, start1, stop1, start2, stop2) =>
  ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2

const createAFrameElement = (type, attributes = {}, scene) => {
  const element = document.createElement(`a-${type}`)

  scene.appendChild(element)

  for (const key in attributes) {
    if (Object.hasOwnProperty.call(attributes, key)) {
      element.setAttribute(key, attributes[key])
    }
  }

  return element
}

const ITEMS_PER_LENGTH = 10

const scene = $("a-scene")
const ground = $("[data-ground]")
const GROUND_WIDTH = + ground.getAttribute("width")
const GROUND_HEIGHT = + ground.getAttribute("height")


const TRUNK_MIN_HEIGHT = 0.5
const TRUNK_MAX_HEIGHT = 1

const TRUNK_MIN_RADIUS = 0.03125
const TRUNK_MAX_RADIUS = 0.0625

const CROWN_MIN_RADIUS = 0.125
const CROWN_MAX_RADIUS = 0.25

const FIR_CROWN_MIN_HEIGHT = 0.5
const FIR_CROWN_MAX_HEIGHT = 1

const MAX_TREE_OFFSET = GROUND_WIDTH / ITEMS_PER_LENGTH * 0.25

const getRandomTreeOffset = () => {
  const randomAngle = map(Math.random(), 0, 1, 0, 2 * Math.PI)
  return {
    x: MAX_TREE_OFFSET * Math.cos(randomAngle),
    z: MAX_TREE_OFFSET * Math.sin(randomAngle),
  }
}

const createTree = ({x, y, z}, scene) => {
  const sizeFactor = Math.random()
  const trunkHeight = map(sizeFactor, 0, 1, TRUNK_MIN_HEIGHT, TRUNK_MAX_HEIGHT)
  const trunkRadius = map(sizeFactor, 0, 1, TRUNK_MIN_RADIUS, TRUNK_MAX_RADIUS)
  const crownRadius = map(sizeFactor, 0, 1, CROWN_MIN_RADIUS, CROWN_MAX_RADIUS)

  const offsetVector = getRandomTreeOffset()

  const trunk = createAFrameElement("cylinder", {
    position: {
      x: x + offsetVector.x,
      y: y + trunkHeight / 2,
      z: z + offsetVector.z,
    },
    radius: trunkRadius,
    height: trunkHeight,
    color: "#976300",
  }, scene)

  const crown = createAFrameElement("sphere", {
    position: {
      x: x + offsetVector.x,
      y: y + trunkHeight,
      z: z + offsetVector.z,
    },
    radius: crownRadius,
    color: "#2EAA1C",
  }, scene)
}


const createFir = ({x, y, z}, scene) => {
  const sizeFactor = Math.random()
  const trunkHeight = map(sizeFactor, 0, 1, TRUNK_MIN_HEIGHT, TRUNK_MAX_HEIGHT)
  const trunkRadius = map(sizeFactor, 0, 1, TRUNK_MIN_RADIUS, TRUNK_MAX_RADIUS)
  const crownRadius = map(sizeFactor, 0, 1, CROWN_MIN_RADIUS, CROWN_MAX_RADIUS)
  const crownHeigth = map(sizeFactor, 0, 1, FIR_CROWN_MIN_HEIGHT, FIR_CROWN_MAX_HEIGHT)

  const offsetVector = getRandomTreeOffset()

  const trunk = createAFrameElement("cylinder", {
    position: {
      x: x + offsetVector.x,
      y: y + trunkHeight / 2,
      z: z + offsetVector.z,
    },
    radius: trunkRadius,
    height: trunkHeight,
    color: "#976300"
  }, scene)

  const crown = createAFrameElement("cone", {
    position: {
      x: x + offsetVector.x,
      y: y + trunkHeight,
      z: z + offsetVector.z,
    },
    "radius-top": 0,
    "radius-bottom": crownRadius,
    height: crownHeigth,
    color: "#2EAA1C",
  }, scene)
}

const baseCords = {x: -1.75, y: 0, z: -5.75}

for (let x = 0; x < ITEMS_PER_LENGTH; x++) {
  for (let z = 0; z < ITEMS_PER_LENGTH; z++) {
    const treeFunction = Math.random() > 0.5 ? createTree : createFir

    treeFunction(
      {
        x: baseCords.x + x * GROUND_WIDTH / ITEMS_PER_LENGTH,
        y: baseCords.y,
        z: baseCords.z + z * GROUND_HEIGHT / ITEMS_PER_LENGTH,
      },
      scene
    )
  }
}
