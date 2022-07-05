import React from 'react'
import Logo from '../../Public/image/Picture1.png'

const Footer=() => {
    return (
        <>
            <div className="container d-block fixed-bottom position-relative">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div className="col-md-4 d-flex align-items-center">
                        <span className="text-muted">&copy; 2022 Mighty Bytes</span>
                    </div>
                    <ul className="nav col-md-4 justify-content-center list-unstyled d-flex text-muted">
                        <li className="ms-3">
                            <a href="/selectPage">Home</a>
                        </li>
                        <li className="ms-3">
                            <a href="/cp">CP</a>
                        </li>
                        <li className="ms-3">
                            <a href="/posts">Dev</a>
                        </li>
                        <li className="ms-3">
                            <a href="/news">News</a>
                        </li>
                    </ul>
                    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li className="ms-3">
                            <a href="" className='text-muted'>
                                <i class="fa-solid fa-envelope"></i>
                            </a>
                        </li>
                        <li className="ms-3">
                            <a href="" className='text-muted'>
                                <i class="fa-solid fa-phone"></i>
                            </a>
                        </li>
                    </ul>
                </footer>
            </div>
        </>
    )
}
export default Footer