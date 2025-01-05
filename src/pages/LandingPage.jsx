import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSingleEffect } from "react-haiku";
import { getStarsCount } from "../utils/utils";
import { Link, Spinner } from "@chakra-ui/react";

import star from '../assets/common/icon-star.svg';
import Header from "../components/navs/Header/Header";
import github from '../assets/common/icon-github.svg';
import docs from '../assets/common/icon-docs.svg';

import FadeContent from "../content/Animations/FadeContent/FadeContent";
import LandingComponentNav from "../components/navs/LandingComponentNav/LandingComponentNav";
import AnimatedContent from "../content/Animations/AnimatedContent/AnimatedContent";

const LandingPage = () => {
  const [stars, setStars] = useState(0);
  const [activeBeams, setActiveBeams] = useState([]);
  const activeBeamsRef = useRef([]);
  const isMounted = useRef(false);
  const navigate = useNavigate();


  useSingleEffect(() => {
    const fetchStars = async () => {
      const count = await getStarsCount();
      setTimeout(() => {
        setStars(count);
      }, 1000);
    };

    fetchStars();
  });

  useEffect(() => {
    isMounted.current = true;

    const interval = setInterval(() => {
      if (isMounted.current) {
        const randomLine = Math.floor(Math.random() * 8);
        if (!activeBeamsRef.current.includes(randomLine)) {
          activeBeamsRef.current.push(randomLine);
          setActiveBeams([...activeBeamsRef.current]);

          setTimeout(() => {
            activeBeamsRef.current = activeBeamsRef.current.filter(
              (line) => line !== randomLine
            );
            setActiveBeams([...activeBeamsRef.current]);
          }, 2000); // Match animation duration
        }
      }
    }, 500);

    return () => {
      isMounted.current = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="landing-wrapper">
      <Header />
      <div className="type-logo">
        <AnimatedContent reverse>
          <svg width="1517" height="346" viewBox="0 0 1517 346" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="letter-r" d="M0.886719 274.586V82.8803H48.0524L52.9972 118.255C57.8152 109.886 63.6475 102.786 70.4941 96.9539C77.3407 91.1216 85.3285 86.5571 94.4573 83.2606C103.586 79.9641 113.476 78.3158 124.126 78.3158V134.61H106.249C98.6414 134.61 91.5412 135.498 84.9481 137.273C78.6086 139.048 73.0299 141.964 68.2119 146.021C63.6475 149.825 60.0974 155.15 57.5616 161.997C55.2794 168.59 54.1383 176.958 54.1383 187.101V274.586H0.886719Z" fill="white" />
            <path d="M231.786 279.15C212.514 279.15 195.397 275.093 180.436 266.979C165.728 258.61 154.19 247.073 145.822 232.365C137.454 217.404 133.27 200.16 133.27 180.635C133.27 160.856 137.327 143.359 145.442 128.144C153.81 112.676 165.348 100.504 180.055 91.6287C195.017 82.7535 212.387 78.3158 232.166 78.3158C251.184 78.3158 267.794 82.4999 281.994 90.868C296.448 99.2361 307.606 110.52 315.467 124.721C323.581 138.921 327.638 155.277 327.638 173.788C327.638 176.324 327.512 179.113 327.258 182.156C327.258 185.199 327.004 188.496 326.497 192.046H176.276V159.715H273.626C272.865 148.05 268.554 138.794 260.693 131.948C253.086 124.848 243.577 121.297 232.166 121.297C223.544 121.297 215.683 123.326 208.583 127.383C201.483 131.441 195.904 137.4 191.847 145.261C187.79 153.122 185.761 163.138 185.761 175.31V186.34C185.761 196.23 187.663 204.978 191.466 212.586C195.27 219.94 200.595 225.645 207.442 229.702C214.289 233.76 222.276 235.788 231.405 235.788C240.534 235.788 248.015 233.886 253.847 230.083C259.933 226.279 264.497 221.334 267.54 215.248H321.933C318.383 227.167 312.297 237.944 303.675 247.58C295.307 257.216 285.037 264.95 272.865 270.782C260.694 276.361 247 279.15 231.786 279.15Z" fill="white" />
            <path d="M411.913 279.15C396.191 279.15 383.005 276.614 372.354 271.543C361.958 266.218 354.224 259.244 349.152 250.623C344.334 241.747 341.925 231.985 341.925 221.334C341.925 209.923 344.841 199.78 350.673 190.905C356.506 182.03 365.508 175.056 377.68 169.985C389.851 164.913 405.066 162.377 423.324 162.377H470.489C470.489 153.248 469.222 145.768 466.686 139.936C464.404 133.85 460.6 129.285 455.275 126.242C450.203 123.199 443.357 121.678 434.735 121.678C425.352 121.678 417.365 123.706 410.772 127.764C404.432 131.821 400.502 137.907 398.98 146.021H347.25C348.772 132.328 353.336 120.537 360.943 110.647C368.551 100.504 378.694 92.643 391.373 87.0643C404.305 81.232 418.886 78.3158 435.115 78.3158C453.119 78.3158 468.714 81.3588 481.901 87.4447C495.34 93.5306 505.61 102.279 512.71 113.69C520.064 125.101 523.741 139.175 523.741 155.911V276.246H472.756L472.772 245.678C470.236 250.749 466.939 255.314 462.882 259.371C459.078 263.428 454.641 266.979 449.569 270.021C444.498 272.811 438.792 274.966 432.453 276.488C426.367 278.263 419.52 279.15 411.913 279.15ZM424.845 238.071C431.185 238.071 436.89 237.056 441.962 235.028C447.033 232.745 451.344 229.576 454.894 225.518C458.444 221.461 461.361 216.897 463.643 211.825C465.925 206.5 467.447 200.794 468.207 194.709V194.328H429.79C422.436 194.328 416.35 195.342 411.532 197.371C406.968 199.146 403.545 201.809 401.262 205.359C398.98 208.655 397.839 212.459 397.839 216.77C397.839 221.334 398.98 225.265 401.262 228.561C403.545 231.858 406.714 234.267 410.772 235.788C414.829 237.31 419.52 238.071 424.845 238.071Z" fill="white" />
            <path d="M642.685 279.15C623.413 279.15 606.297 274.839 591.336 266.218C576.374 257.596 564.583 245.805 555.961 230.844C547.593 215.882 543.409 198.766 543.409 179.494C543.409 159.715 547.593 142.344 555.961 127.383C564.583 112.169 576.374 100.25 591.336 91.6287C606.297 82.7535 623.54 78.3158 643.066 78.3158C667.663 78.3158 688.329 84.9089 705.066 98.095C722.055 111.028 732.833 128.905 737.397 151.727H680.722C678.693 143.105 674.129 136.385 667.029 131.567C660.182 126.496 651.941 123.96 642.305 123.96C633.683 123.96 625.949 126.242 619.102 130.807C612.509 135.117 607.311 141.33 603.507 149.445C599.704 157.559 597.802 167.322 597.802 178.733C597.802 187.355 598.816 195.089 600.845 201.936C603.127 208.529 606.17 214.234 609.974 219.052C614.031 223.87 618.849 227.547 624.428 230.083C630.006 232.619 635.965 233.886 642.305 233.886C648.898 233.886 654.73 232.872 659.802 230.844C664.873 228.561 669.311 225.392 673.115 221.334C676.918 217.023 679.454 211.952 680.722 206.12H737.397C732.833 228.435 722.055 246.185 705.066 259.371C688.076 272.557 667.282 279.15 642.685 279.15Z" fill="white" />
            <path className="letter-t" d="M839.041 345.951C825.347 345.951 813.302 343.796 802.906 339.485C792.762 335.174 784.902 328.074 779.323 318.184C773.744 308.295 770.955 294.855 770.955 277.865V127.383H753.907V82.8803L770.907 82.8911L770.865 30.0091H824.206V82.8803H874.035V127.383H824.206V278.245C824.206 286.614 825.981 292.446 829.531 295.742C833.335 299.039 839.675 300.687 848.55 300.687H873.654V345.951H839.041Z" fill="white" />
            <path d="M1013.39 279.15C1003.5 279.15 994.754 277.882 987.146 275.347C979.539 273.064 972.819 269.768 966.987 265.457C961.154 261.146 956.21 256.201 952.152 250.623L952.16 274.586H898.901V0.720703H952.152V109.126C957.985 100.25 965.846 92.8966 975.735 87.0643C985.878 81.232 998.304 78.3158 1013.01 78.3158C1030.51 78.3158 1046.1 82.7535 1059.8 91.6287C1073.74 100.25 1084.65 112.169 1092.51 127.383C1100.62 142.344 1104.68 159.588 1104.68 179.113C1104.68 198.132 1100.62 215.248 1092.51 230.463C1084.65 245.678 1073.87 257.596 1060.18 266.218C1046.48 274.839 1030.89 279.15 1013.39 279.15ZM1000.46 232.745C1010.1 232.745 1018.72 230.463 1026.32 225.899C1033.93 221.334 1039.89 214.995 1044.2 206.88C1048.51 198.766 1050.67 189.51 1050.67 179.113C1050.67 168.463 1048.51 159.081 1044.2 150.966C1039.89 142.852 1033.93 136.512 1026.32 131.948C1018.72 127.13 1010.1 124.721 1000.46 124.721C990.57 124.721 981.821 127.13 974.214 131.948C966.86 136.512 961.028 142.852 956.717 150.966C952.406 158.827 950.25 168.083 950.25 178.733C950.25 189.383 952.406 198.766 956.717 206.88C961.028 214.995 966.86 221.334 974.214 225.899C981.821 230.463 990.57 232.745 1000.46 232.745Z" fill="white" />
            <path d="M1127.76 274.586V82.8803H1181.01V274.586H1127.76Z" fill="white" />
            <path d="M1434.8 279.15C1417.05 279.15 1401.71 276.361 1388.78 270.782C1375.85 264.95 1365.7 257.216 1358.35 247.58C1351 237.69 1346.69 226.533 1345.42 214.107H1398.67C1399.68 218.672 1401.59 222.856 1404.37 226.659C1407.42 230.21 1411.35 233.126 1416.17 235.408C1421.24 237.69 1427.2 238.831 1434.04 238.831C1440.64 238.831 1445.96 237.944 1450.02 236.169C1454.33 234.14 1457.5 231.604 1459.53 228.561C1461.81 225.518 1462.95 222.222 1462.95 218.672C1462.95 213.6 1461.43 209.67 1458.39 206.88C1455.34 204.091 1450.91 201.809 1445.07 200.034C1439.24 198.259 1432.27 196.61 1424.15 195.089C1415.03 193.06 1406.02 190.778 1397.15 188.242C1388.53 185.706 1380.67 182.41 1373.56 178.353C1366.72 174.042 1361.27 168.717 1357.21 162.377C1353.15 156.038 1351.12 148.177 1351.12 138.794C1351.12 127.383 1354.17 117.113 1360.25 107.985C1366.59 98.8557 1375.59 91.6287 1387.26 86.3036C1399.18 80.9784 1413.38 78.3158 1429.86 78.3158C1453.19 78.3158 1471.57 83.641 1485.01 94.2913C1498.71 104.688 1506.82 118.888 1509.36 136.893H1459.15C1457.88 131.314 1454.71 127.003 1449.64 123.96C1444.57 120.917 1437.85 119.396 1429.48 119.396C1420.86 119.396 1414.14 120.917 1409.32 123.96C1404.76 127.003 1402.47 131.06 1402.47 136.132C1402.47 139.428 1403.99 142.471 1407.04 145.261C1410.08 147.796 1414.39 150.079 1419.97 152.107C1425.8 153.882 1432.9 155.657 1441.27 157.432C1456.23 160.475 1469.29 164.025 1480.45 168.083C1491.61 171.886 1500.35 177.465 1506.69 184.819C1513.03 191.919 1516.2 202.316 1516.2 216.009C1516.46 228.181 1513.16 239.085 1506.31 248.721C1499.72 258.357 1490.34 265.837 1478.17 271.163C1465.99 276.488 1451.54 279.15 1434.8 279.15Z" fill="white" />
            <path d="M1288.95 274.586C1275.26 274.586 1263.21 272.431 1252.82 268.12C1242.67 263.809 1234.81 256.709 1229.23 246.819C1223.65 236.93 1220.87 223.49 1220.87 206.5V127.384H1203.82V82.8804L1220.82 82.8913L1220.78 30.0093H1274.12V82.8804H1323.94V127.384H1274.12V206.881C1274.12 215.249 1275.89 221.081 1279.44 224.377C1283.25 227.674 1289.58 229.322 1298.46 229.322H1323.56V274.586H1288.95Z" fill="white" />
            <rect className="i-point" x="1127.73" y="0.720703" width="53.2783" height="53.2805" fill="white" />
            <circle cx="1261.07" cy="139.936" r="18.1435" fill="white" />
            <circle cx="680.646" cy="133.573" r="18.1435" fill="white" />
            <circle cx="651.224" cy="118.463" r="18.1435" fill="white" />
            <circle cx="618.145" cy="122.833" r="18.1435" fill="white" />
            <circle cx="170.84" cy="122.833" r="18.1435" fill="white" />
            <circle cx="594.765" cy="144.967" r="18.1435" fill="white" />
            <circle cx="586.699" cy="175.411" r="18.1435" fill="white" />
            <circle cx="593.402" cy="206.766" r="18.1435" fill="white" />
            <circle cx="614.937" cy="230.723" r="18.1435" fill="white" />
            <circle cx="646.967" cy="236.427" r="18.1435" fill="white" />
            <circle cx="680.646" cy="224.26" r="18.1435" fill="white" />
            <circle cx="1261.07" cy="165.016" r="18.1435" fill="white" />
            <circle cx="1261.07" cy="190.15" r="18.1435" fill="white" />
            <circle cx="1261.07" cy="215.075" r="18.1435" fill="white" />
            <circle cx="1285.16" cy="238.802" r="18.1435" fill="white" />
            <path d="M1323.6 238.329C1323.6 248.35 1324.9 257.867 1314.88 257.867C1304.86 257.867 1296.74 249.744 1296.74 239.724C1296.74 229.704 1304.86 223.59 1314.88 223.59C1325.4 223.59 1323.6 228.309 1323.6 238.329Z" fill="white" />
          </svg>
        </AnimatedContent>
      </div>

      <div className="hero-info">
        <LandingComponentNav />

        <AnimatedContent>
          <div className="headline">
            <div className="divider"></div>
            <p>
              Handpicked animated components
              collection for <span>creative developers</span>
            </p>

            <Link href="https://github.com/DavidHDev/react-bits" target="_blank" className="landing-button">
              <img src={github} alt="github octocat" /> Star On GitHub <div className="button-divider"></div> <img className="star-icon" src={star} alt="5 pointed star" />
              {stars ? <FadeContent blur><span>{String(stars)}</span></FadeContent> : <Spinner boxSize={3} />}
            </Link>

            <div className="landing-button docs-button" onClick={() => navigate('/text-animations/split-text')}>
              <img src={docs} alt="github octocat" /> Read Docs
            </div>
          </div>
        </AnimatedContent>
      </div>

      <div className="perspective-grid">
        <svg width="1889" height="546" viewBox="0 0 1889 546" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.6">
            {/* Vertical lines */}
            {[
              "M672.481 0.981445L0.51955 545.125",
              "M750.216 0.981445L348.619 545.125",
              "M827.95 0.981445L609.679 545.125",
              "M905.686 0.981445L836.117 545.125",
              "M983.42 0.981445L1052.99 545.125",
              "M1061.16 0.981445L1279.43 545.125",
              "M1138.89 0.981445L1540.49 545.125",
              "M1216.62 0.981445L1888.59 545.125",
            ].map((d, i) => (
              <g key={i}>
                {/* Permanent line */}
                <path d={d} stroke="#B3B3B3" strokeWidth="1.36036" />
                {/* Animated beam */}
                {activeBeams.includes(i) && (
                  <path
                    className="beam"
                    d={d}
                    stroke="blue"
                    strokeWidth="3"
                  />
                )}
              </g>
            ))}

            {/* Horizontal lines */}
            {[
              "M665.011 7.03027H1224.09",
              "M618.978 44.1279L1270.48 44.128",
              "M566.178 87.0635H1322.93",
              "M521.831 122.975H1367.27",
              "M462.972 170.638H1426.13",
              "M386.005 232.965H1503.1",
              "M286.699 313.382H1602.41",
              "M160.111 415.89H1728.99",
              "M0.519531 545.125H1888.59",
            ].map((d, i) => (
              <path
                key={i}
                d={d}
                stroke="#B3B3B3"
                strokeWidth="1.36036"
              />
            ))}
          </g>
        </svg>
      </div>

      <div className="author">
        <FadeContent blur>
          Made with 🤍 by <Link href="https://davidhaz.com/" target="_blank">this guy</Link>
        </FadeContent>
      </div>
    </section>
  );
};

export default LandingPage;
