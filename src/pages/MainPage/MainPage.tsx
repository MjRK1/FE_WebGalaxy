import React from 'react';
import { CheckOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';
import { Progress } from 'antd';
import { Slide } from 'react-slideshow-image';

const FOR_HEAD = [
  {
    id: nanoid(3),
    title: 'Инновационные решения',
  },
  {
    id: nanoid(3),
    title: 'Персонализированный подход',
  },
  {
    id: nanoid(3),
    title: 'Надежная поддержка',
  },
  {
    id: nanoid(3),
    title: 'Быстрое внедрение',
  },
  {
    id: nanoid(3),
    title: 'Долгосрочное партнерство',
  },
];
const FOR_IT_HEAD = [
  {
    id: nanoid(3),
    title: 'Современные технологии',
  },
  {
    id: nanoid(3),
    title: 'Интеграция и совместимость',
  },
  {
    id: nanoid(3),
    title: 'Безопасность данных',
  },
  {
    id: nanoid(3),
    title: 'Эффективность и оптимизация',
  },
  {
    id: nanoid(3),
    title: 'Развитие и обновления',
  },
];
const PROGRESSES = [
  {
    id: nanoid(3),
    name: 'СНИЖЕНИЕ ЗАТРАТ НА МАТЕРИАЛЫ',
    percent: 5,
  },
  {
    id: nanoid(3),
    name: 'УЛУЧШЕНИЕ КАЧЕСТВА СЕРВИСОВ И ПРОДАЖ',
    percent: 40,
  },
  {
    id: nanoid(3),
    name: 'СНИЖЕНИЕ УРОВНЯ НЕЛИКВИДНЫХ ЗАПАСОВ НА СКЛАДЕ',
    percent: 40,
  },
  {
    id: nanoid(3),
    name: 'СОКРАЩЕНИЕ СРОКА ОБОРАЧИВАЕМОСТИ ОБОРОТНЫХ СРЕДСТВ',
    percent: 25,
  },
  {
    id: nanoid(3),
    name: 'СНИЖЕНИЕ ПРОИЗВОДСТВЕННОГО БРАКА',
    percent: 25,
  },
  {
    id: nanoid(3),
    name: 'СНИЖЕНИЕ ОБЩИХ ЗАТРАТ',
    percent: 20,
  },
];
const SLIDER_ITEMS = [
  {
    id: nanoid(3),
    ordering: 1,
    title: 'Большие коммерческие объекты',
    img: `${process.env.PUBLIC_URL}/sliderImages/mall.jpg`,
  },
  {
    id: nanoid(3),
    ordering: 2,
    title: 'Оффисы и бизнес-центры',
    img: `${process.env.PUBLIC_URL}/sliderImages/office.jpg`,
  },
  {
    id: nanoid(3),
    ordering: 3,
    title: 'Объекты легкой и тяжелой промышленности',
    img: `${process.env.PUBLIC_URL}/sliderImages/factory.jpg`,
  },
];

export const MainPage = () => {
  const twoColors = { '0%': '#5dacfa', '100%': '#a1ff7c' };
  // @ts-ignore
  return (
    <div className="main-page">
      <div className="main-wrapper__about-container">
        <div className="about-container__about-description--background">
          <div className="about-container__about-description">
            <div className="about-container__title">
              «Galaxy Store»
            </div>
            <div className="about-description__description">
              Galaxy Store - инновационная компания, специализирующаяся на разработке
              {' '}
              <br />
              высокотехнологичных приложений, направленных на автоматизацию бизнес-процессов.
              <br />
              Наша команда создает разнообразное программное обеспечение,
              <br />
              обеспечивая клиентов инструментами для эффективного управления и оптимизации операций.
              <br />
              <br />
              Мы также предоставляем высококачественные услуги по обслуживанию клиентов,
              <br />
              гарантируя надежную поддержку и индивидуальный подход к каждому заказчику.
              <br />
              <br />
              Вмешательство Galaxy Store в область автоматизации и программного обеспечения обеспечивает клиентам
              <br />
              современные решения для повышения производительности и конкурентоспособности их бизнеса.
            </div>
          </div>
        </div>
      </div>
      <div className="main-wrapper__why-us-wrapper">
        <div className="why-us-wrapper__title">Почему «Galaxy Store»?</div>
        <div className="why-us-wrapper__answers-wrapper">
          <div className="answers-wrapper__for-head-wrapper">
            <div className="for-head-wrapper__title">Для руководителя</div>
            {FOR_HEAD.map((item) => (
              <div key={item?.id} className="for-head-wrapper__for-head-item">
                <div className="for-head-item__icon">
                  <CheckOutlined className="for-head-item__icon-colored" />
                </div>
                <div className="for-head-item__title">{item?.title}</div>
              </div>
            ))}
          </div>
          <div className="answers-wrapper__for-it-head-wrapper">
            <div className="for-it-head-wrapper__title">Для IT-директора</div>
            {FOR_IT_HEAD.map((item) => (
              <div key={item?.id} className="for-it-head-wrapper__for-it-head-item">
                <div className="for-it-head__icon">
                  <CheckOutlined className="for-it-head__icon-colored" />
                </div>
                <div className="for-it-head__title">{item?.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="main-wrapper_effect-description">
        <div className="effect-description__effect-title">
          Эффект от внедрения нашего ПО
        </div>
        <div className="effect-description__effect-progresses">
          {PROGRESSES.map((item) => (
            <div key={item?.id} className="progress">
              <div className="progress__title">{item?.name}</div>
              <div className="progress_progress-bar">
                <Progress percent={item?.percent} strokeColor={twoColors} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="main-wrapper__image-slider-wrapper">
        <div className="image-slider-wrapper__title">
          Наши продукты используется в
        </div>

        {/* <div className="image-slider-wrapper__image-slider"> */}
        <Slide
          autoplay={false}
          prevArrow={<LeftOutlined />}
          nextArrow={<RightOutlined />}
        >
          {SLIDER_ITEMS.map((item) => (
            <div key={item?.id} className="each-slide-effect">
              <div style={{ backgroundImage: `url(${item?.img})` }}>
                <span>{item?.title}</span>
              </div>
            </div>
          ))}
        </Slide>

        {/*  <div className="image-slider-wrapper__slider-left-border"> */}
        {/*    <div className="slider-left-border__left-button" onClick={() => handleChangeSliderItem('LEFT')}> */}
        {/*      <LeftOutlined /> */}
        {/*    </div> */}
        {/*  </div> */}
        {/*  <motion.div */}
        {/*    className="image-slider-wrapper_image-container" */}
        {/*  > */}
        {/*    <div className="image-container__title">{sliderItem?.title}</div> */}
        {/*    <img alt={sliderItem?.title} src={sliderItem?.img} /> */}
        {/*  </motion.div> */}
        {/*  <div className="image-slider-wrapper__slider-right-border"> */}
        {/*    <div className="slider-right-border__right-button" onClick={() => handleChangeSliderItem('RIGHT')}> */}
        {/*      <RightOutlined /> */}
        {/*    </div> */}
        {/*  </div> */}
      </div>
    </div>
  );
};
