
import style from './Home.css';
import React, { Component } from 'react';

function mailchimp_form() { return {__html: `<!-- Begin MailChimp Signup Form -->
  <link href="//cdn-images.mailchimp.com/embedcode/slim-10_7.css" rel="stylesheet" type="text/css">
  <style type="text/css">
    #mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }
    /* Add your own MailChimp form style overrides in your site stylesheet or in this style block.
       We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
  </style>
  <div id="mc_embed_signup">
  <form action="//scolab.us1.list-manage.com/subscribe/post?u=2ee384b2ff8dde377edc61ead&amp;id=c35356d940" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
      <div id="mc_embed_signup_scroll">
    
    <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="adresse courriel" required>
      <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
      <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_2ee384b2ff8dde377edc61ead_c35356d940" tabindex="-1" value=""></div>
      <div class="clear"><input type="submit" value="Inscription" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
      </div>
  </form>
  </div>

  <!--End mc_embed_signup-->`}; };

class Home extends Component {

  constructor(props){
    super(props); 

    this.bg = props.bg;
    this.logo = props.logo;
    this.boum = props.boum;
  }

  scrollToApp(){
    window.location = "#jeu";
  }

  render() {
    return (
      <div className={style.home}>
        <div className={style.bg} style={{backgroundImage: 'url(' + this.bg + ')'}}></div>
        <div className={style.landing}>
          <h1><img src={this.boum} alt="Boum, Le Jeu Mathématique" /></h1>
          <h2>Le Jeu Mathématique</h2>
          <div className={style.intro}>
          <p>&laquo;&nbsp;<strong>BOUM</strong>&nbsp;&raquo; est une version numérique du jeu mathématique <em>&laquo;&nbsp;Exploding Dots&nbsp;&raquo;</em> popularisé par James Tanton. Cet outil pédagogique est développé par <strong><a href="http://www.scolab.com" target="_blank">Scolab</a></strong> et distribué gratuitement dans le contexte du <em><a href="https://www.theglobalmathproject.org" target="_blank">Global Math Week 2017</a></em>.</p>
          </div>

          <div className={style.half}>
            <div className={style.subscribe}>
              <p>Pour rester informé à propos du lancement à venir de cet outil, veuillez vous inscrire ci-bas.</p>
              <div dangerouslySetInnerHTML={mailchimp_form()} />
            </div>
            <div className={style.invite}>
              <p>Entre-temps, nous vous invitons à jouer avec une première version de notre prototype.</p>
              <div><button onClick={this.scrollToApp} className={style.CTA}><i className="fa fa-chevron-down"></i></button></div>
            </div>
          </div>

          <h3>Créé en équipe par&nbsp;:</h3>
          <ul className={style.team}>
            <li><img src="https://i2.wp.com/www.netmath.ca/wp-content/uploads/sites/7/2016/07/8515774.png?w=400&ssl=1" alt="Nicolas Lemay" /></li>
            <li><img src="https://i1.wp.com/www.netmath.ca/wp-content/uploads/sites/7/2016/07/icon_andre_1024.png?w=1024&ssl=1" alt="André Lacasse" /></li>
            <li><img src="https://i1.wp.com/www.netmath.ca/wp-content/uploads/sites/7/2016/07/20970279.png?w=400&ssl=1" alt="Pierre-Michel Morais-Godin" /></li>
            <li><img src="https://i0.wp.com/www.netmath.ca/wp-content/uploads/sites/7/2016/07/icon_py_512.png?w=512&ssl=1" alt="Pierre-Yves" /></li>
            <li><img src="https://i0.wp.com/www.netmath.ca/wp-content/uploads/sites/7/2016/07/icon_sunil_1024.png?w=1024&ssl=1" alt="Sunil Singh" /></li>
            <li><img src="https://i1.wp.com/www.netmath.ca/wp-content/uploads/sites/7/2016/07/simon_face.png?w=1024&ssl=1" alt="Simon Lavallée" /></li>
            <li><img src="https://i0.wp.com/www.netmath.ca/wp-content/uploads/sites/7/2016/07/james.png?w=251&ssl=1" alt="James Tanton" /></li>
          </ul>

        </div>
      </div>
    );
  }
}

export default Home;


