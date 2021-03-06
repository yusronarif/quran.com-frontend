import React, { PropTypes } from 'react';
import * as customPropTypes from 'customPropTypes';
import styled from 'styled-components';
import { lighten } from 'polished';
import Loader from 'quran-components/lib/Loader';

const style = require('./style.scss');

const List = styled.dl`
  padding-top: 8px;
  text-align: right;

  dt {
    font-size: 10px;
    font-weight: 500;
    padding-top: 25px;
    padding-bottom: 5px;
  }

  dd {
    color: $brand-primary;
    font-weight: 300;
  }
`;

const Close = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
  background: ${props => lighten(0.1, props.theme.textMuted)};
  height: 26px;
  width: 26px;
  padding: 7px 8px;
  font-size: 10px;
  border-radius: 16px;
  color: #fff;
  z-index: 20;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Info = styled.div`
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 16px;
  background: ${props => lighten(0.1, props.theme.textMuted)};
  h2 {
    font-size: 22px;
    font-family: ${props => props.theme.fonts.montserrat};
    font-weight: bold;
  }
  h3 {
    font-size: 20px;
    font-family: ${props => props.theme.fonts.montserrat};
    font-weight: bold;
  }
  p {
    font-size: 16px;
  }
`;

const SurahInfo = ({ chapter, info, isShowingSurahInfo, onClose }) => {
  // So we don't need to load images and files unless needed
  if (!isShowingSurahInfo) return <noscript />;
  if (!info) return <Loader isActive />;

  const handleClose = () =>
    onClose({ isShowingSurahInfo: !isShowingSurahInfo });

  return (
    <div className={`col-xs-12 ${style.container} chapter-info ${style.show}`}>
      {onClose &&
        <Close tabIndex="-1" className="ss-delete" onClick={handleClose} />}
      <div className="row" style={{ width: '100%' }}>
        <div
          className={`col-md-3 col-xs-6 ${style.bg} ${style[
            chapter.revelationPlace
          ]}`}
        />
        <div className={`${style.list} col-md-1 col-xs-6`}>
          <List>
            <dt>VERSES</dt>
            <dd className="text-uppercase">
              {chapter.versesCount}
            </dd>
            <dt>PAGES</dt>
            <dd className="text-uppercase">
              {chapter.pages.join('-')}
            </dd>
          </List>
        </div>
        <Info className={`${info.languageName} times-new col-md-8`}>
          <div dangerouslySetInnerHTML={{ __html: info.text }} />
          <div>
            <p>
              <em>
                Source: {info.source}
              </em>
            </p>
          </div>
        </Info>
      </div>
    </div>
  );
};

SurahInfo.propTypes = {
  onClose: PropTypes.func,
  isShowingSurahInfo: PropTypes.bool,
  chapter: customPropTypes.surahType,
  info: customPropTypes.infoType
};

export default SurahInfo;
