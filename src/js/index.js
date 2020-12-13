class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.isDeleting = false;
    // Initial Type Speed
    this.typeSpeed = 300
    // Current index of word
    this.current = null
  
    this.fullTxt = null
  }

  get_full_txt(){
    this.current = this.wordIndex % this.words.length;
    // Get full text of current word
    this.fullTxt = this.words[this.current];
  }

  add_or_remove_char(){
    if (this.isDeleting) {
      // Remove char
      this.txt = this.fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = this.fullTxt.substring(0, this.txt.length + 1);
    }
    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  }

  delete_chars(){
    this.typeSpeed = 300 
    if (this.isDeleting) {
      this.typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === this.fullTxt) {
      // Make pause at end
      this.typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      this.typeSpeed = 500;
    }
  }

  type_first() {
    this.get_full_txt()
    this.add_or_remove_char()
    
    setTimeout(() => this.type_first(), this.typeSpeed);
  }

  type() {
    this.get_full_txt()
    this.add_or_remove_char()
    this.delete_chars()
    

    setTimeout(() => this.type(), this.typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {


  // start up book animation
  (function () { 
      let cover = document.querySelector('.cover-js')

      let page = document.querySelectorAll('.book__right.book__right_turn')

      setTimeout(() => {
          cover.classList.add('cover__turn')
      }, 2100);

      setTimeout(() => {
          cover.style.zIndex = -1
      }, 2800);

      page.forEach((el, index) => {
          el.style.zIndex = 20 - index
      })

      page.forEach((el, index) => {
          setTimeout(() => {
              el.classList.remove('book__right_turn')
              setTimeout(() => {
                  el.style.zIndex = 'unset'
              }, 600);
          }, (index + 1) * 200 + 2100);
      })

  })();
  

  //  turn page
  (function () { 
      let turnPageBtn = document.querySelectorAll('.btn__change-page')

      turnPageBtn.forEach((el, index) => {
          el.onclick = (e) => {
              let pageTurnId = el.getAttribute('data-page')
              if (!pageTurnId) return

              // pause video when chang page

              // let videos = document.querySelectorAll('video')

              // videos.forEach((el_1) => {
              //     el_1.pause()
              // })
              
              let pageTurn = document.getElementById(pageTurnId)

              if (pageTurn.classList.contains('book__right_turn')) {
                  pageTurn.classList.remove('book__right_turn')
                  setTimeout(() => {
                      pageTurn.style.zIndex = 'unset'
                  }, 600);
              } else {
                  pageTurn.classList.add('book__right_turn')
                  pageTurn.style.zIndex = 20 - index
              }
          }
      })
  })();
// var width = $(window).width();
//   if (width < 678){
//     alert(1)
//     var firstFronPage = document.getElementById('book__front-js-1'); 
//     firstFronPage.insertAdjacentHTML('afterend', `</div class='hidden'><div class="book__page book__right book__right_turn hidden" id="page-2">`);
//   }
// $(window).resize(function() {

//   var width = $(window).width();
//   if (width < 678){
//     alert(1)
//     var firstFronPage = document.getElementById('book__front-js-1'); 
//     firstFronPage.insertAdjacentHTML('afterend', `</div class='hidden'><div class="book__page book__right book__right_turn hidden" id="page-2">`);
//   }
  

// });



  // Typewriter
  (function () { 
      
      setTimeout(() => {
        let txtElement = document.querySelector('.txt-type-first');
        let words = JSON.parse(txtElement.getAttribute('data-words'));
        let wait = txtElement.getAttribute('data-wait');
        let writer_first = new TypeWriter(txtElement, words, wait);
        writer_first.type_first()

        setTimeout(() => {
            txtElement = document.querySelector('.txt-type');
            words = JSON.parse(txtElement.getAttribute('data-words'));
            wait = txtElement.getAttribute('data-wait');
            // Init TypeWriter
            let writer = new TypeWriter(txtElement, words, wait);
            writer.type();
            
        }, 9000);
          
      }, 3500);
  })();
  
  
  
}




// handle videos

// let videos = document.querySelectorAll('video')

// videos.forEach((el) => {
//     el.onplay = () => {
//         videos.forEach((el_1) => {
//             if (el === el_1) {
//                 el.play()
//             } else {
//                 el_1.pause()
//             }
//         })
//     }
// })

