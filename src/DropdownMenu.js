import React from 'react';
import Css from './Css';

var instances = 0;

class DropdownMenu extends React.Component {
  constructor() {
    super();
    this.toggleMenu = this.toggleMenu.bind(this);
    instances += 1;

    this.MENUITEMS_DIV = '__react_bs_dd_menuItems_' + instances;
    this.CARAT_CLASS = '__react_bs_dd_carat_' + instances;
    this.TRIGGER_CLASS = '__react_bs_dd_trigger_' + instances;
  }

  toggleMenu(e) {
    const items = document.getElementById(this.MENUITEMS_DIV);

    if (items) {
      items.classList.toggle("show");
      if (this.props.fadeIn && this.props.fadeIn == "true") {
        this.fadeIn(document.getElementById(this.MENUITEMS_DIV));
      }
      this.toggleArrow(e);
    }
  }

  toggleArrow(e) {
    const carat = document.getElementById(this.CARAT_CLASS);

    if (carat) {
      if (carat.className === "glyphicon glyphicon-triangle-top") {
        carat.className = "glyphicon glyphicon-triangle-bottom";
      }
      else {
        carat.className = "glyphicon glyphicon-triangle-top";
      }
    }
  }

  fadeIn(element) {
    element.style.opacity = 0;

    var tick = function() {
      element.style.opacity = +element.style.opacity + 0.04;

      if (+element.style.opacity < 1) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
      }
    };

    tick();
  }

  showLoggedInUserName() {
    if (this.props.userName) {
      return (
        <div>
          <p>Logged in as: <br /><strong>{this.props.userName}</strong></p>
          <hr style={Css.separator} />
        </div>
      );
    }
  }

  getTrigger() {
    if (this.props.triggerType && this.props.trigger) {
      switch(this.props.triggerType.toLowerCase()) {
        case "image":
          var triggerStyle = Css.imageTrigger;
          var caratStyle = Css.triangle;

          if (this.props.triggerWidth) { triggerStyle.width = this.props.triggerWidth; }
          if (this.props.triggerHeight) { triggerStyle.height = this.props.triggerHeight; }
          if (this.props.caratColor) { caratStyle.color = this.props.caratColor; }

          return (
            <div onClick={this.toggleMenu}>
              <img src={this.props.trigger} style={triggerStyle} className={this.TRIGGER_CLASS} />
              <span id={this.CARAT_CLASS} className="glyphicon glyphicon-triangle-bottom" style={caratStyle}></span>
            </div>
          );
        case "text":
          return (
            <div className={this.TRIGGER_CLASS} onClick={this.toggleMenu} style={Css.textTrigger}>
              {this.props.trigger}&nbsp;&nbsp;
              <span id={this.CARAT_CLASS} className="glyphicon glyphicon-triangle-bottom" style={caratStyle}></span>
            </div>
          );
        case "icon":
          return (
            <span className={this.props.trigger} style={Css.gear} onClick={this.toggleMenu}></span>
          );
        default:
          throw "The value for DropdownMenu 'triggerType' is not supported for DropdownMenu. Try 'image', 'text' or 'icon'.";
      }
    }
    else {
      return (
        <span className="glyphicon glyphicon-cog" style={Css.gear} onClick={this.toggleMenu}></span>
      );
    }
  }

  getMenuStyle() {
    const menuStyle = (JSON.parse(JSON.stringify(Css.menuContent))); // Clone the current style
    const position = this.props.position === undefined ? 'right' : this.props.position;
    const supportedPositions = ['left', 'center', 'right'];

    if (supportedPositions.indexOf(position.toLowerCase()) === -1) {
      throw "The value for 'position' prop is not supported for DropdownMenu. Try 'left', 'center' or 'right'.";
    }

    if (position) {
      var baseWidth = parseInt(Css.menuContent.minWidth.replace('px',''));
      var offset = 0;
      baseWidth = baseWidth - 40;

      // We need to use negative numbers as we are offsetting menu to the left
      if (position === "center") {
        offset = (baseWidth / 2) * -1;
      }
      if (position === "left") {
        offset = baseWidth * -1;
      }

      menuStyle.left = offset.toString() + 'px';
    }

    return menuStyle;
  }

  componentWillMount() {
    const TRIGGER_CLASS = this.TRIGGER_CLASS;
    const MENUITEMS_DIV = this.MENUITEMS_DIV;
    const CARAT_CLASS = this.CARAT_CLASS;

    window.addEventListener("click", function(e) {
      const klass = e.target.className;
      const carat = document.getElementById(CARAT_CLASS);

      if (klass !== MENUITEMS_DIV + " show" && klass !== TRIGGER_CLASS && !klass.lastIndexOf("glyphicon", 0) == 0) {
        var menuItemDiv = document.getElementById(MENUITEMS_DIV);

        if (menuItemDiv) {
          menuItemDiv.classList.remove('show');

          if (carat) {
            carat.className = "glyphicon glyphicon-triangle-bottom";
          }
        }
      }
    });
  }

  render() {
    if (this.props.children.length === 0) {
      throw "DropdownMenu must have at least one MenuItem child."
    }

    return (
      <div style={Css.menu}>
        {this.getTrigger()}
        <div id={this.MENUITEMS_DIV} className={this.MENUITEMS_DIV} style={this.getMenuStyle()}>
          {this.showLoggedInUserName()}
          {this.props.children}
        </div>
      </div>
    );
  }
};

export default DropdownMenu;
