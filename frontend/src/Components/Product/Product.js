import React, { Fragment } from 'react';

const Product = ({product}) => {
  return <Fragment>
      <div className="m-3 rounded-3 bg-light bordered">
                    <button className="btn rounded-circle btn-success d-inline my-3 text-center mx-2 fs-6 fw-normal text-black pColor">
                      AA
                    </button>
                    <h6 className="d-inline">{product.author}</h6>
                    <div className="dropdown d-inline float-end m-3">
                      <div
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-three-dots-vertical"
                          viewBox="0 0 16 16"
                        >
                          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        </svg>
                      </div>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <a className="dropdown-item" href="#">
                            View profile
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Add friend
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Message
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div
                      id="carouselExampleIndicators"
                      className="carousel slide"
                      data-bs-ride="carousel"
                    >
                      <div className="carousel-indicators">
                        <button
                          type="button"
                          data-bs-target="#carouselExampleIndicators"
                          data-bs-slide-to="0"
                          className="active"
                          aria-current="true"
                          aria-label="Slide 1"
                        ></button>
                        <button
                          type="button"
                          data-bs-target="#carouselExampleIndicators"
                          data-bs-slide-to="1"
                          aria-label="Slide 2"
                        ></button>
                        <button
                          type="button"
                          data-bs-target="#carouselExampleIndicators"
                          data-bs-slide-to="2"
                          aria-label="Slide 3"
                        ></button>
                      </div>
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <img
                            src={product.images[0].url}
                            className="d-block w-100 pImg"
                            alt="..."
                          />
                        </div>
                        <div className="carousel-item">
                          <img
                            src={product.images[0].url}
                            className="d-block w-100 pImg"
                            alt="..."
                          />
                        </div>
                        <div className="carousel-item">
                          <img
                            src={product.images[0].url}
                            className="d-block w-100 pImg"
                            alt="..."
                          />
                        </div>
                      </div>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                    <div className="icon">
                    <i className="far fa-thumbs-up ms-2 p-2"></i>
                    <i className="far fa-comments p-2"></i>
                      <h5 className="postTitle">{product.title}</h5>
                    </div>
                    <div>
                      <p className="px-3 my-0 fw-light">{product.likes}</p>
                      <p className="px-3 text-bold my-0">{product.description}</p>
                      <p className="px-3 fw-light my-0">
                        view all {product.comments} comments
                      </p>
                      <p className="px-3 fw-light my-0"> 5 days ago </p>
                    </div>
                    <div className="row m-0 ">
                      <form>
                        <input
                          type="text"
                          className="col-8 border-0 col-form-label form-control mb-3"
                          placeholder="Comment..."
                        />
                      </form>
                    </div>
                  </div>
  </Fragment>;
};

export default Product;
