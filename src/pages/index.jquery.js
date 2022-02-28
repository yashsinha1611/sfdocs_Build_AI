import React, {useEffect} from 'react';
import $ from 'jquery';
class IndexJquery extends React.Component {
  
  componentDidMount(){
    this.windowResolutionCheck() 
  }

  componentWillUnmount(){
    this.windowResolutionCheck() 
  }

  windowResolutionCheck(){
   let headerLength = $('article header').length;
   if(headerLength == 2){
    $('article header:first-child').hide()
   } 
  if($(window).width() > 1000){ 
     $('main .col--3 ul.table-of-contents').hide()
      window.addEventListener('scroll', (event) => {
        if($('article ul').hasClass('table-of-contents')){ 
          const number = $(window).scrollTop(); 
          if (number > $('article ul.table-of-contents').height()) {
              $('main .col--3 ul.table-of-contents').fadeIn();
          } else{
            $('main .col--3 ul.table-of-contents').fadeOut();
          }
        } 
      });
      window.addEventListener('resize',(event) => {
        if($('article ul').hasClass('table-of-contents')){ 
        const number = $(window).scrollTop(); 
        if (number > $('article ul.table-of-contents').height()) {
            $('main .col--3 ul.table-of-contents').fadeIn();
        } else{
          $('main .col--3 ul.table-of-contents').fadeOut();
        }
      } 
      });
    }
    } 
   
    render() {
      return (
        <div></div>
      )
    }
  }
  export default IndexJquery;