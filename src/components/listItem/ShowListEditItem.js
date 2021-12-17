import './styles.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react/cjs/react.production.min";




export default function ShowListEditItem({ items, name }) {

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };


    return (
        <div className="edit">
            <p style={{color:"white"}} className="name-item">{name}</p>
            <div style={{marginTop: "20px"}}>
                <Carousel responsive={responsive}>
                    {items.map((Item, index) => (
                        <div key={index} className="edit-item">
                            <div className="sub-edit-item">
                                <Canvas>
                                    <ambientLight intensity={0.5} />
                                    <Suspense fallback={<>...</>}>
                                        <Item position={[0, -1, 0]} />
                                    </Suspense>

                                </Canvas>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
