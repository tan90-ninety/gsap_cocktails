import { useState } from "react";
import { allCocktails } from "../constants";
import { base } from '../constants/config.js'
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const Menu = () => {
    const contentRef = useRef(null);

    const [currentIndex, setCurrentIndex] = useState(0);

    useGSAP(() => {
        gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 1 })
        gsap.fromTo('.cocktail img', { opacity: 0, xPercent: -100 }, { xPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut' })
        gsap.fromTo('.details h2', { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, ease: 'power1.inOut' })
        gsap.fromTo('.details p', { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, ease: 'power1.inOut' })
    }, [currentIndex])


    const totalCocktails = allCocktails.length;
    const gotoSlide = (index) => {
        const newIndex = (index + totalCocktails) % totalCocktails;
        setCurrentIndex(newIndex);
    }

    const getCocktaileAt = (indexOffset) => {
        return allCocktails[(currentIndex + indexOffset + totalCocktails) % totalCocktails];
    }

    const currentCocktail = getCocktaileAt(0);
    const preCocktail = getCocktaileAt(-1);
    const nextCocktail = getCocktaileAt(1);

    return (
        <section id="menu" aria-labelledby="menu-heading">
            <img src={new URL("/images/slider-left-leaf.png", import.meta.url).href} alt="m-left-leaf" id="m-left-leaf" />
            <img src={new URL("/images/slider-right-leaf.png", import.meta.url).href} alt="m-right-leaf" id="m-right-leaf" />

            <h2 id="menu-heading" className="sr-only">Cocktail Menu</h2>
            <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
                {allCocktails.map((cocktail, index) => {
                    const isActive = index === currentIndex;
                    return (
                        <button
                            key={cocktail.id}
                            className={`${isActive ? "text-white border-white" : "text-white/50 border-white/50"}`}
                            onClick={() => gotoSlide(index)}
                        >
                            {cocktail.name}
                        </button>
                    );
                })}
            </nav>

            <div className="content">
                <div className="arrows">
                    <button className="text-left" onClick={() => gotoSlide(currentIndex - 1)}>
                        <span>{preCocktail.name}</span>
                        <img src={new URL("/images/right-arrow.png", import.meta.url).href} aria-hidden alt="right-arrow" />
                    </button>
                    <button className="text-left" onClick={() => gotoSlide(currentIndex + 1)}>
                        <span>{nextCocktail.name}</span>
                        <img src={new URL("/images/left-arrow.png", import.meta.url).href} aria-hidden alt="left-arrow" />
                    </button>
                </div>

                <div className="cocktail">
                    <img src={new URL(base + currentCocktail.image, import.meta.url).href} alt="object-contain" />
                </div>

                <div className="recipe">
                    <div ref={contentRef} className="info">
                        <p>Recipe for:</p>
                        <p id="title">{currentCocktail.name}</p>
                    </div>

                    <div className="details">
                        <h2>{currentCocktail.title}</h2>
                        <p>{currentCocktail.description}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Menu;