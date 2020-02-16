import { useEffect } from "react";
import PropTypes from "prop-types";

// React Hooks version
export default function Swipeable(props) {
  let el = null;
  let touchStartedTime = null;
  let clientX = null;
  let clientY = null;
  let clientXDiff = null;
  let clientYDiff = null;

  function handleTouchStart(e) {
    touchStartedTime = Date.now();
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
    clientXDiff = 0;
    clientYDiff = 0;
  }

  function handleTouchMove(e) {
    if (!clientX || !clientY) return;

    clientXDiff = clientX - e.touches[0].clientX;
    clientYDiff = clientY - e.touches[0].clientY;
  }

  function handleTouchEnd(e) {
    const {
      minDistance = 20,
      maxDistance = Infinity,
      timeout = 500,
      onSwipeLeft,
      onSwipeRight,
      onSwipeUp,
      onSwipeDown
    } = props;
    const timeDiff = Date.now() - touchStartedTime;
    const clientXDiffAbs = Math.abs(clientXDiff);
    const clientYDiffAbs = Math.abs(clientYDiff);

    // Horizontal swipe
    if (clientXDiffAbs > clientYDiffAbs) {
      if (clientXDiffAbs >= minDistance && clientXDiffAbs <= maxDistance && timeDiff <= timeout) {
        // Prevent other swipeables
        e.stopPropagation();
        if (clientXDiff > 0) {
          onSwipeLeft && onSwipeLeft();
        } else {
          onSwipeLeft && onSwipeRight();
        }
      }
    // Vertical swipe
    } else {
      if (clientYDiffAbs >= minDistance && clientXDiffAbs <= maxDistance && timeDiff <= timeout) {
        // Prevent other swipeables
        e.stopPropagation();
        if (clientYDiff > 0) {
          onSwipeUp && onSwipeUp();
        } else {
          onSwipeDown && onSwipeDown();
        }
      }
    }

    clientX = null;
    clientY = null;
    touchStartedTime = null;
  }

  // handleTouchStart = handleTouchStart.bind(that);
  // handleTouchMove = handleTouchMove.bind(that);
  // handleTouchEnd = handleTouchEnd.bind(that);

  useEffect(() => {
    console.log(el)
    // componentDidMount
    el.addEventListener("touchstart", handleTouchStart);
    el.addEventListener("touchmove", handleTouchMove);
    el.addEventListener("touchend", handleTouchEnd);

    // componentWillUnmount
    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [el]);

  return props.children(DOMNode => {
    el = DOMNode;
  });
}

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

// TODO: Rewrite using Hooks
// export default class Swipeable extends PureComponent {
//   constructor(props) {
//     super(props);

//     this.el = null;
//     this.touchStartedTime = null;
//     this.clientX = null;
//     this.clientY = null;
//     this.clientXDiff = null;
//     this.clientYDiff = null;

//     this.handleTouchStart = this.handleTouchStart.bind(this);
//     this.handleTouchMove = this.handleTouchMove.bind(this);
//     this.handleTouchEnd = this.handleTouchEnd.bind(this);
//   }

//   componentDidMount() {
//     this.el.addEventListener("touchstart", this.handleTouchStart);
//     this.el.addEventListener("touchmove", this.handleTouchMove);
//     this.el.addEventListener("touchend", this.handleTouchEnd);
//   }

//   componentWillUnmount() {
//     this.el.removeEventListener("touchstart", this.handleTouchStart);
//     this.el.removeEventListener("touchmove", this.handleTouchMove);
//     this.el.removeEventListener("touchend", this.handleTouchEnd);
//   }

//   handleTouchStart(e) {
//     this.touchStartedTime = Date.now();
//     this.clientX = e.touches[0].clientX;
//     this.clientY = e.touches[0].clientY;
//     this.clientXDiff = 0;
//     this.clientYDiff = 0;
//   }

//   handleTouchMove(e) {
//     if (!this.clientX || !this.clientY) return;

//     this.clientXDiff = this.clientX - e.touches[0].clientX;
//     this.clientYDiff = this.clientY - e.touches[0].clientY;
//   }

//   handleTouchEnd(e) {
//     const {
//       minDistance = 20,
//       maxDistance = Infinity,
//       timeout = 500,
//       onSwipeLeft,
//       onSwipeRight,
//       onSwipeUp,
//       onSwipeDown
//     } = this.props;
//     const timeDiff = Date.now() - this.touchStartedTime;
//     const clientXDiffAbs = Math.abs(this.clientXDiff);
//     const clientYDiffAbs = Math.abs(this.clientYDiff);

//     // Horizontal swipe
//     if (clientXDiffAbs > clientYDiffAbs) {
//       if (clientXDiffAbs >= minDistance && clientXDiffAbs <= maxDistance && timeDiff <= timeout) {
//         // Prevent other swipeables
//         e.stopPropagation();
//         if (this.clientXDiff > 0) {
//           onSwipeLeft && onSwipeLeft();
//         } else {
//           onSwipeLeft && onSwipeRight();
//         }
//       }
//     // Vertical swipe
//     } else {
//       if (clientYDiffAbs >= minDistance && clientXDiffAbs <= maxDistance && timeDiff <= timeout) {
//         // Prevent other swipeables
//         e.stopPropagation();
//         if (this.clientYDiff > 0) {
//           onSwipeUp && onSwipeUp();
//         } else {
//           onSwipeDown && onSwipeDown();
//         }
//       }
//     }

//     this.clientX = null;
//     this.clientY = null;
//     this.touchStartedTime = null;
//   }

//   render() {
//     const { children } = this.props;

//     return children(el => {
//       this.el = el;
//     });
//   }
// };

// Swipeable.propTypes = {
//   children: PropTypes.func.isRequired,
//   minDistance: PropTypes.number,
//   maxDistance: PropTypes.number,
//   timeout: PropTypes.number,
//   onSwipeLeft: PropTypes.func,
//   onSwipeRight: PropTypes.func,
//   onSwipeUp: PropTypes.func,
//   onSwipeDown: PropTypes.func
// };
