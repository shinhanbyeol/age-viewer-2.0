import { type Sigma } from 'sigma';

export function eventSetter(renderer: Sigma) {
  this.graph = renderer.getGraph();
  this.isDragging = false;
  this.dragedNode = null;

  const eventThis = this;
  // down node event
  renderer.on('downNode', (e) => {
    eventThis.isDragging = true;
    eventThis.dragedNode = e.node;
    console.log('downNode');
    console.log(eventThis.isDragging, eventThis.dragedNode);
  });

  // up node event
  renderer.on('upNode', (e) => {
    eventThis.isDragging = false;
  });

  // mouse node move event
  renderer.getMouseCaptor().on('mousemovebody', (e) => {
    if (eventThis.isDragging && eventThis.draggedNode) {
      console.log('isdrgging');
      console.log(eventThis.dragedNode);
      console.log(eventThis.isDragging);
      const pos = renderer.viewportToGraph(e);

      eventThis.graph.setNodeAttribute(eventThis.dragedNode, 'x', pos.x);
      eventThis.graph.setNodeAttribute(eventThis.dragedNode, 'y', pos.y);

      // prevent sigma to move camera
      e.preventSigmaDefault();
      e.original.preventDefault();
      e.original.stopPropagation();
    }
  });
}
