let imageItems = [...document.querySelectorAll('.img-wrap')];
let titles = [...document.querySelectorAll('h2')]
let sections = [];

let options = {
    rootMargin: '0px',
    threshold: .2
  }


let setItemActive = (entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('active');
        }
       
    })
}

let observer = new IntersectionObserver(setItemActive, options);
  
imageItems.forEach((item,idx) => {
    item.children[0].style.backgroundImage = `url(./images/${idx+1}.jpeg)`
    idx % 2 == 0 ? item.style.left = '55%' : item.style.left = '5%'
    observer.observe(item)
})

titles.forEach((title, idx) => {
    idx % 2 == 0 ? title.style.left = '45%' : title.style.left = '35%';
    observer.observe(title)
})

class Section{
    constructor(element, idx){
        this.idx = idx
        this.element = element
        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => this.isVisible = entry.isIntersecting);
        });
        this.observer.observe(this.element);

    }

    animateText(){
        let pos = (
                    window.scrollY - (window.innerHeight * this.idx)) * 0.55 < 0 
                    ? 0
                    : (window.scrollY - (window.innerHeight * this.idx)
                    ) * 0.55 
        this.element.children[0].style.transform = `translateY(-${pos}px)`
    }
}

[...document.querySelectorAll('section')].forEach((section, idx) => {
    let newSection = new Section(section, idx);
    sections.push(newSection);

})

function animate(){
    sections.forEach(section => {
        section.animateText()
    })
    requestAnimationFrame(animate)
}

animate()



  