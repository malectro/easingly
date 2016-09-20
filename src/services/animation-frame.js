const handlers = new Set();

export function forEach(handler) {
  handlers.add(handler);

  if (handlers.size === 1) {
    requestAnimationFrame(draw)
  }
}

export function remove(handler) {
  handlers.delete(handler);
}

function draw(time) {
  if (handlers.size > 0) {
    requestAnimationFrame(draw)
  }

  for (let handler of handlers) {
    handler(time);
  }
}

