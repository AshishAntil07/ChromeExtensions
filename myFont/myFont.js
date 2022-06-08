let keys = [];

document.addEventListener('keydown', e => {
  keys.push(e.key);
  if(keys.includes('Control') && keys.includes('Shift') && keys.includes('F')){
    keys=[];
    myFontMain()
  }
})

const myFontMain = () => {
  let zIndex = 2147483447;
  let count = 0;
  
  document.body.insertAdjacentHTML('beforeend', `<div i id = 'c7083432' style = 'z-index: 2147483647'class="c570918234">&Cross;</div>`)
  const closeBtn = document.querySelector('.c570918234');
  document.body.insertAdjacentHTML('beforeend', `<div i id = 'h5789034' style = 'z-index: 2147483647'class='h7983423'></div>`)
  const pointerFriend = document.getElementById('h5789034');
  
  const documentMouseHandler_my_font = e => {
    if(e.target.classList.contains('c570918234') || e.target.classList.contains('pr098735-9') || e.target.parentNode?.classList?.contains('pr098735-9') || e.target.parentNode?.parentNode?.classList?.contains('pr098735-9') || e.target.parentNode?.parentNode?.parentNode?.classList?.contains('pr098735-9') || e.target.parentNode?.parentNode?.parentNode?.parentNode?.classList?.contains('pr098735-9')){
      pointerFriend.style.display = "none";
      return
    }
    pointerFriend.style.display = "flex";
    pointerFriend.style.top = `${e.clientY+scrollY+17.5}px`;
    pointerFriend.style.left = `${e.clientX+scrollX+12.5}px`;
    const fontFam = getComputedStyle(e.target).fontFamily;
    pointerFriend.innerHTML = fontFam.slice(0, fontFam.indexOf(',')!==-1?fontFam.indexOf(','):fontFam.length);
  }

  const documentMouseOut_my_font = () => {
    pointerFriend.style.display = 'none';
  }

  document.addEventListener('mousemove', documentMouseHandler_my_font)
  document.addEventListener('mouseout', documentMouseOut_my_font)
  
  const propertyTeller_my_font = e => {
    debugger;
    const Element = e.target;
    if(Element.classList.contains('pr098735-9') || Element.parentNode?.classList?.contains('pr098735-9') || Element.parentNode?.parentNode?.classList?.contains('pr098735-9') || Element.parentNode?.parentNode?.parentNode?.classList?.contains('pr098735-9') || Element.parentNode?.parentNode?.parentNode?.parentNode?.classList?.contains('pr098735-9')){
      return
    }
    // const id = e.target.id?e.target.id:sampleids[parseInt(Math.random()*sampleids.length)]
    // e.target.id = id;
    let mainDiv = document.createElement('div')
    mainDiv.classList.add('pr098735-9');
    mainDiv.style.left = `${e.clientX+scrollX}px`;
    mainDiv.style.top = `${e.clientY+scrollY}px`;
    mainDiv.style.zIndex = zIndex;
    zIndex++;
    mainDiv.innerHTML = `
    <div i style='display:flex;justify-content:space-between;'>
      <div i class='fm0987454'><p i p507823='false'>Font-Family</p>${getComputedStyle(Element).fontFamily}</div>
      <div i id='closeMyFont${count}'>&Cross;</div>
    </div>
    <div i fc5709834 class='fc5709834'>
      <div i f8052433='true'>
        <div i><p i p507823='false'>Font Size</p>${getComputedStyle(Element).fontSize ? getComputedStyle(Element).fontSize : null}</div>
        <div i><p i p507823='false'>Line Height</p>${getComputedStyle(Element).lineHeight ? getComputedStyle(Element).lineHeight : null}</div>
        <div i><p i p507823='false'>Font Weight</p>${getComputedStyle(Element).fontWeight ? getComputedStyle(Element).fontWeight: null}</div>
      </div>
      <div i f8052433='true'>
        <div i><p i p507823='false'>Font Variant</p>${getComputedStyle(Element).fontVariant ? getComputedStyle(Element).fontVariant: null}</div>
        <div i><p i p507823='false'>Font Style</p>${getComputedStyle(Element).fontStyle ? getComputedStyle(Element).fontStyle : null}</div>
        <div i><p i p507823='false'>Shadow</p>${getComputedStyle(Element).textShadow ? getComputedStyle(Element).textShadow : null}</div>
      </div>
    </div>
    <div i style='display:flex;justify-content:center;align-items: flex-end;margin-bottom: 10px !important;'>
      <div i class='fm0987454' style='text-align: center'><p i style='text-align:center' p507823='false'>Font Color</p>${getComputedStyle(Element).color ? getComputedStyle(Element).color : null}</div>
      <div i style = 'height: 20px; width: 20px; border-radius: 50%; margin-left: 10px !important; background-color: ${getComputedStyle(Element).color}'></div>
    </div>
    <div i style='font-family: ${getComputedStyle(Element).fontFamily};font-style:${getComputedStyle(Element).fontStyle};font-weight: ${getComputedStyle(Element).fontWeight}; color: white; word-wrap: break-word;'>
      Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
      <br>
      1 2 3 4 5 6 7 8 9 0
    </div>
    `
    document.body.insertAdjacentElement('beforeend', mainDiv)
    const closeBtnStyle = document.getElementById(`closeMyFont${count}`).style;
    closeBtnStyle.color = 'white';
    closeBtnStyle.cursor = 'pointer';
    const removeMyFontPr = e => {
      e.target.removeEventListener('click', removeMyFontPr)
      mainDiv.remove();
    }
    document.getElementById(`closeMyFont${count}`).addEventListener('click', removeMyFontPr)
    count++; 
  }

  const closeAllFunctions_my_font = e => {
    document.removeEventListener('click', propertyTeller_my_font);
    for(let i = 0; i < document.getElementsByClassName('pr098735-9').length;){
      document.getElementsByClassName('pr098735-9')[0].remove()
    }
    pointerFriend.remove();
    document.removeEventListener('mousemove', documentMouseHandler_my_font)
    document.removeEventListener('mouseout', documentMouseOut_my_font)
    e.target.removeEventListener('click', closeAllFunctions_my_font)
    e.target.remove()
  }
  
  closeBtn.addEventListener('click', closeAllFunctions_my_font)
  document.addEventListener('click', propertyTeller_my_font)
}