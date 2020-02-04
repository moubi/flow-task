import { PureComponent } from "react";
import PropTypes from "prop-types";

// TODO: Rewrite using Hooks
export default class Swipeable extends PureComponent {
  constructor(props) {
    super(props);

    this.el = null;
    this.touchStartedTime = null;
    this.clientX = null;
    this.clientY = null;
    this.clientXDiff = null;
    this.clientYDiff = null;

    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }

  componentDidMount() {
    this.el.addEventListener("touchstart", this.handleTouchStart, false);
    this.el.addEventListener("touchmove", this.handleTouchMove, false);
    this.el.addEventListener("touchend", this.handleTouchEnd, false);
  }

  componentWillUnmount() {
    this.el.removeEventListener("touchstart", this.handleTouchStart, false);
    this.el.removeEventListener("touchmove", this.handleTouchMove, false);
    this.el.removeEventListener("touchend", this.handleTouchEnd, false);
  }

  handleTouchStart(e) {
    this.touchStartedTime = Date.now();
    this.clientX = e.touches[0].clientX;
    this.clientY = e.touches[0].clientY;
    this.clientXDiff = 0;
    this.clientYDiff = 0;
  }

  handleTouchMove(e) {
    if (!this.clientX || !this.clientY) return;

    this.clientXDiff = this.clientX - e.touches[0].clientX;
    this.clientYDiff = this.clientY - e.touches[0].clientY;
  }

  handleTouchEnd(e) {
    if (this.el !== e.target) return;

    const {
      minDistance = 20,
      maxDistance = Infinity,
      timeout = 500,
      onSwipeLeft,
      onSwipeRight,
      onSwipeUp,
      onSwipeDown
    } = this.props;
    const timeDiff = Date.now() - this.touchStartedTime;
    const clientXDiffAbs = Math.abs(this.clientXDiff);
    const clientYDiffAbs = Math.abs(this.clientYDiff);

    // Horizontal swipe
    if (clientXDiffAbs > clientYDiffAbs) {
      if (clientXDiffAbs >= minDistance && clientXDiffAbs <= maxDistance && timeDiff <= timeout) {
        if (this.clientXDiff > 0) {
          onSwipeLeft && onSwipeLeft();
        } else {
          onSwipeLeft && onSwipeRight();
        }
      }
    // Vertical swipe
    } else {
      if (clientYDiffAbs >= minDistance && clientXDiffAbs <= maxDistance && timeDiff <= timeout) {
        if (this.clientYDiff > 0) {
          onSwipeUp && onSwipeUp();
        } else {
          onSwipeDown && onSwipeDown();
        }
      }
    }

    this.clientX = null;
    this.clientY = null;
    this.touchStartedTime = null;
  }

  render() {
    const { children } = this.props;

    return children(el => {
      this.el = el;
    });
  }
};

Swipeable.propTypes = {
  children: PropTypes.func.isRequired,
  minDistance: PropTypes.number,
  maxDistance: PropTypes.number,
  timeout: PropTypes.number,
  onSwipeLeft: PropTypes.func,
  onSwipeRight: PropTypes.func,
  onSwipeUp: PropTypes.func,
  onSwipeDown: PropTypes.func
};
