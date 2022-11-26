const ctrlArr = ['ControlLeft', 'ControlRight'];
let ctrlPressed;
document.addEventListener('keydown', key => {
  if(ctrlArr.includes(key.code)){
    ctrlPressed = true;
    document.addEventListener('keyup', e => ctrlPressed = false, {once:true});
  }else if(key.code === 'KeyM' && ctrlPressed) main()
});


function main(){
  document.documentElement.style.userSelect = 'none';

  const background = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  background.classList.add('background', 'MyScaleElement');
  background.style.height = (document.documentElement.scrollHeight<window.innerHeight?window.innerHeight:document.documentElement.scrollHeight)+'px';

  let elems = [];
  function addLine(){
    let points = [], lengths = [];
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    line.setAttribute('style', `
      fill: transparent;
      stroke: black;
      stroke-width: 1px;
    `)
    line.setAttribute('points', '');
    
    function assignPoints(){
      points.forEach(point => point.lengths = []);

      lengths.forEach((length, index) => {
        points[index].lengths.push(length);
        points[index+1]?.lengths.push(length);
      })
    }

    const downFunc = e => {
      if(true){
        line.setAttribute('points', line.getAttribute('points')+(line.getAttribute('points').slice(-2, -1)===' '?'':' ')+`${e.clientX+document.documentElement.scrollLeft},${e.clientY+document.documentElement.scrollTop} `);
        const point = document.createElement('div');
        point.setAttribute('style', `
          left: ${e.clientX+document.documentElement.scrollLeft}px;
          top: ${e.clientY+document.documentElement.scrollTop}px;
        `)
        point.classList.add('point', 'MyScaleElement');
        points.push(point);
        elems.push(point);
        point.addEventListener('mousedown', e => {
          const pointMoveFunc = e => {
            const linePoints = line.getAttribute('points').split(' ').filter(elem => elem !== '');
            linePoints.splice(points.indexOf(point), 1, `${e.clientX+document.documentElement.scrollLeft},${e.clientY+document.documentElement.scrollTop}`);
            line.setAttribute('points', linePoints.join(' '));
            point.lengths?.forEach((length, index) => {
              const coordinate = linePoints[(!points.indexOf(point)?2:0)+points.indexOf(point)+(index || -1)].split(',');
              length.setAttribute('style', `
                top: ${(Number(coordinate[1])+e.clientY+document.documentElement.scrollTop)/2}px;
                left: ${(Number(coordinate[0])+e.clientX+document.documentElement.scrollLeft)/2}px;
              `)
              const coordLength = String(Math.sqrt((((document.documentElement.scrollLeft + e.clientX)-Number(coordinate[0]))**2)+((document.documentElement.scrollTop + e.clientY)-Number(coordinate[1]))**2));
              length.innerHTML = `${coordLength.includes('.')?coordLength.slice(0, coordLength.indexOf('.')+3):coordLength}px`;
            })
            point.setAttribute('style', `
              top: ${e.clientY+document.documentElement.scrollTop}px;
              left: ${e.clientX+document.documentElement.scrollLeft}px;
            `)
          }
          document.addEventListener('mousemove', pointMoveFunc)
          document.addEventListener('mouseup', e=>document.removeEventListener('mousemove', pointMoveFunc, {once:true}));
        })
        point.addEventListener('dblclick', e => {
          const prevPoints = line.getAttribute('points').split(' ').filter(elem=>elem!=='');
          prevPoints.splice(points.indexOf(point), 1)
          line.setAttribute('points', prevPoints.join(' '));
          const remLength = lengths.splice(lengths.indexOf(length), 1);
          points.splice(points.indexOf(point), 1);
          length.remove();
          point.remove();
          assignPoints();
          remLength[0]?.remove();
        })
        document.body.append(point);


        const length = document.createElement('div');
        if(points.length > 1){
          const linePoints = line.getAttribute('points').split(' ').filter(elem=>elem!=='');
          length.setAttribute('style', `
            top: ${(document.documentElement.scrollTop + e.clientY + Number(linePoints[linePoints.length-2].split(',')[1]))/2}px;
            left: ${(document.documentElement.scrollLeft + e.clientX + Number(linePoints[linePoints.length-2].split(',')[0]))/2}px;
          `)
          length.classList.add('lengths', 'MyScaleElement');
          lengths.push(length);
          elems.push(length);
          const coordLength = String(Math.sqrt((((document.documentElement.scrollLeft + e.clientX)-Number(linePoints[linePoints.length-2].split(',')[0]))**2)+((document.documentElement.scrollTop + e.clientY)-Number(linePoints[linePoints.length-2].split(',')[1]))**2));
          length.innerHTML = `${coordLength.includes('.')?coordLength.slice(0, coordLength.indexOf('.')+3):coordLength}px`;
          if(points.length > 1) assignPoints();
          document.body.append(length);
        }

        const movePoint = e => {
          point.setAttribute('style', `
            top: ${e.clientY+document.documentElement.scrollTop}px;
            left: ${e.clientX+document.documentElement.scrollLeft}px;
          `)
          const linePoints = line.getAttribute('points').split(' ').filter(elem=>elem!=='')
          point.lengths?.forEach((length, index) => {
            const coordinate = linePoints[(!points.indexOf(point)?2:0)+points.indexOf(point)+(index || -1)].split(',');
            length.setAttribute('style', `
              top: ${(Number(coordinate[1])+e.clientY+document.documentElement.scrollTop)/2}px;
              left: ${(Number(coordinate[0])+e.clientX+document.documentElement.scrollLeft)/2}px;
            `)
            const coordLength = String(Math.sqrt((((document.documentElement.scrollLeft + e.clientX)-Number(coordinate[0]))**2)+((document.documentElement.scrollTop + e.clientY)-Number(coordinate[1]))**2));
            length.innerHTML = `${coordLength.includes('.')?coordLength.slice(0, coordLength.indexOf('.')+3):coordLength}px`;
          })
        }

        const moveFunc = e => {
          const linePoints = line.getAttribute('points').split(' ');
          linePoints.splice(linePoints.length-2, 1, `${e.clientX+document.documentElement.scrollLeft},${e.clientY+document.documentElement.scrollTop}`);
          line.setAttribute('points', linePoints.join(' '))
          
          movePoint(e);
        };
        document.addEventListener('mousemove', moveFunc)
        document.addEventListener('mouseup', e=>document.removeEventListener('mousemove', moveFunc), {once:true});
      }
    }
    background.addEventListener('mousedown', downFunc);
    background.append(line);
    add.addEventListener('click', e => {
      background.removeEventListener('mousedown', downFunc);
      addLine();
    }, {once:true});
  }
  const add = document.createElement('div');
  add.classList.add('plus', 'MyScaleElement');

  const plus = document.createElement('span');
  plus.style.transform = 'rotate(45deg)';
  add.append(plus);

  const close = document.createElement('div');
  close.classList.add('close', 'MyScaleElement');
  close.addEventListener('click', e => {
    add.remove();
    close.remove();
    background.remove();
    elems.forEach(elem=>elem?.remove());
    document.documentElement.style.userSelect = 'auto';
  })

  plus.innerHTML = close.innerHTML = '&Cross;';

  document.body.prepend(close, add, background);
  addLine();
}