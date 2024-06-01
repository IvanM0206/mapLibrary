const mapaFetch = d3.json('barrios-caba.geojson')
const dataFetch = d3.csv('lib2.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  
  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    marks: [
      Plot.geo(barrios, {
        stroke: '#704930',
        
      }),
      Plot.dot(data, {
        x: 'lng',
        y: 'lat',
        r: 7,
        stroke: 'none',
        opacity: 1,
        fill: '#e48d7a',
        title: d => `${d.autor} recomienda \n"${d.nombre}"`,
        
      }),
    ],
    
  })

  /* Agregamos al DOM la visualización chartMap */
  d3.select('#chart').append(() => chartMap);

  chartMap.addEventListener('click', () => {
    const link = "https://bibliofilia.substack.com/p/flores-poesia-y-silencio";
    // Open the link in a new tab
    window.open(link, '_blank');
  });
  
})
