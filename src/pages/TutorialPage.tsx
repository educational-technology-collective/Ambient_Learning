import { IonContent, IonPage, IonicSlides, useIonViewWillEnter } from "@ionic/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import '@ionic/react/css/ionic-swiper.css';
import Card from "../CardComp/Card";
import tapping from '../../tapping.gif'
import { hideBar } from "../utilities/showTabBar";

const TutorialPage: React.FC = () => {

  const card = {
    _id: 'sdaddusda',
    lmid: 'jjiajsid',
    type: 'q',
    content: {
      question: 'Master Skywalker, there are too many of them. What shall we do?',
      answer: 'You die with them'
    }
  }

  useIonViewWillEnter(hideBar);

  return(
    <IonPage>
     <IonContent scrollY={false} className="home-content">
      <Swiper modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]} effect="fade">
        <SwiperSlide>
          <img src={tapping} alt='Tapping' style={{width: '50%', height: '70%'}}/>
        </SwiperSlide>
        <SwiperSlide>Bad</SwiperSlide>
      </Swiper>
     </IonContent>
    </IonPage>
  )
};

export default TutorialPage;