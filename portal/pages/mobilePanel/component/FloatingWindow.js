import React, { PureComponent } from "react";
import { Icon, NumberInput, Slider, Theme } from "@lugia/lugia-web";
import ThemeProvider from "@lugia/theme-hoc";
import Widgets from "@lugia/lugia-web/dist/consts";
import { getBorder } from "@lugia/theme-utils";
import {
  FloatingWindowContainer,
  FloatingWindowLeftContainer,
  FloatingWindowLeft,
  FloatingWindowRight,
  FloatingWindowcontent,
  AddPanelWrap,
  ShrinkWrap
} from "../css";

const inputView = {
  [Widgets.NumberInput]: {
    Input: {
      normal: {
        width: 105,
        margin: {
          left: 10,
          right: 10
        }
      }
    }
  }
};
const sliderView = {
  [Widgets.Slider]: {
    SliderTrack: {
      normal: {
        width: 225,
        height: 4,
        background: { color: "#fff" },
        opacity: 1
      },
      hover: {
        background: { color: "#fff" },
        opacity: 1
      },
      active: {
        background: { color: "#fff" },
        opacity: 1
      }
    },
    SliderPassedWay: {
      normal: {
        height: 4,
        background: { color: "#4D63FF" }
      }
    },
    SliderButton: {
      normal: {
        width: 10,
        height: 10,
        background: { color: "#fff" },
        border: getBorder({ style: "solid", color: "#4D63FF", width: 1 })
      },
      active: {
        background: { color: "#fff" },
        width: 10,
        height: 10,
        border: getBorder({ style: "solid", color: "#4D63FF", width: 1 })
      },
      hover: {
        width: 10,
        height: 10,
        background: { color: "#red" },
        border: getBorder({ style: "solid", color: "#4D63FF", width: 1 })
      }
    },
    SliderMarks: {
      normal: {
        nth: { color: "#747E90", font: { weight: 700, size: 12 } }
      },
      disabled: {
        nth: { color: "#747E90", font: { weight: 700, size: 12 } }
      }
    }
  }
};
const NumberInputConfig = {
  max:100,
  min: 0,
  step: 2,
  size: "small"
}
const leftpx = {
  "0": "-250px",
  "1": "0",
  "2": "-250px"
};
class FloatingWindow extends PureComponent {
  constructor(props) {
    super(props);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    let { floatingWindowState: newValue, gridMargin, sliderVale  } = nextProps;
    if (prevState) {
      let { floatingWindowState: oldValue, horizontal, vertical, sliderVale: oldSliderVale} = prevState;
      if (
        newValue === oldValue &&
        horizontal === gridMargin[0] &&
        vertical === gridMargin[1] &&
        sliderVale === oldSliderVale
      ) {
        return null;
      }
    }
    return {
      floatingWindowState: newValue,
      horizontal: gridMargin[0],
      vertical: gridMargin[1],
      sliderVale
    };
  }
  onChangeHorizontal = ({ newValue: value }) => {
    this.props.changeGridMargin([value, this.state.vertical])
  };
  onChangeVertical = ({ newValue: value }) => {
    this.props.changeGridMargin([this.state.horizontal, value])
  };
  render() {
    let { floatingWindowState, horizontal, vertical, sliderVale } = this.state;
    return (
      <FloatingWindowContainer style={{ right: leftpx[floatingWindowState] }}>
        <FloatingWindowLeftContainer>
          <FloatingWindowLeft
            onClick={this.props.openOperationPanel}
            themeProps={this.props.getPartOfThemeProps("Container")}
          >
            . . . .
          </FloatingWindowLeft>
          {floatingWindowState === 2 && (
            <FloatingWindowRight
              onClick={this.props.selectedSwitchDragAndOpenOperationPanel}
              themeProps={this.props.getPartOfThemeProps("Container")}
            >
              <Icon iconClass={"lugia-icon-financial_layout"}></Icon>
            </FloatingWindowRight>
          )}
        </FloatingWindowLeftContainer>
        <FloatingWindowcontent
          style={{
            transform:
              floatingWindowState === 0 || floatingWindowState === 2
                ? "scale(0,0)"
                : "scale(1,1)"
          }}
        >
          <div className="lable" key="x">
            <span>
              水平间距<i>(px)</i>
            </span>
            <span>
              垂直间距<i>(px)</i>
            </span>
          </div>
          <div className="input_group">
            <div className="input_wrap">
              <Theme config={inputView}>
                <NumberInput
                  value={horizontal}
                  key="horizontal"
                  {...NumberInputConfig}
                  onChange={this.onChangeHorizontal}
                />
              </Theme>
            </div>
            <div className="input_wrap">
              <Theme config={inputView}>
                <NumberInput
                  value={vertical}
                  key="vertical"
                  {...NumberInputConfig}
                  onChange={this.onChangeVertical}
                />
              </Theme>
            </div>
          </div>
          <div className="input_cols_wrap">
            <p className="input_cols_lable">栅格数：</p>
            <div className="input_cols_slider">
              <Theme config={sliderView}>
                <Slider
                  defaultValue={sliderVale}
                  onChange={
                    this.props.sliberChange
                  }
                  tips
                  marks={{
                    2: "2",
                    3: "3",
                    4: "4",
                    6: "6",
                    8: "8",
                    12: "12"
                  }}
                />
              </Theme>
            </div>
          </div>
          <AddPanelWrap
            onClick={this.props.addGridItem}
            themeProps={this.props.getPartOfThemeProps("Container")}
          >
            <Icon iconClass={"lugia-icon-reminder_plus"} />
            &nbsp;<span>增加区块</span>
          </AddPanelWrap>
          <ShrinkWrap themeProps={this.props.getPartOfThemeProps("Container")}>
            <Icon
              iconClass={"lugia-icon-direction_arrows_alt"}
              onClick={this.props.hiddenOperationPanel}
            />
          </ShrinkWrap>
        </FloatingWindowcontent>
      </FloatingWindowContainer>
    );
  }
}

export default ThemeProvider(FloatingWindow, "lagiu_floating_window", {
  hover: true,
  active: true,
  focus: true
});
