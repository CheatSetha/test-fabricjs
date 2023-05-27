import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const FabricCanvas = ({ filter }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: 'white',
      selectionColor: 'blue',
      selectionLineWidth: 2,
      width: 600,
      height: 400,
    });

    fabric.Image.fromURL('path/to/your/image.jpg', function (img) {
      img.scale(0.5);
      canvas.add(img);

      if (filter) {
        let fabricFilter = new fabric.Image.filters[filter.filterName](filter.options);
        img.filters.push(fabricFilter);
        img.applyFilters();
        canvas.renderAll();
      }
    });

    return () => {
      canvas.dispose();
    };
  }, [filter]);

  return <canvas ref={canvasRef} />;
};

export default FabricCanvas;