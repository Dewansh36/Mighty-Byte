import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Public/css/friends.css'
function Friends() {
    return (
        <>
            <div className="card container text-center mt-5 fs-3 fw-bold mb-0 d-flex justify-content-center bg-white">FRIENDS</div>
            <div class="container mt-3 d-flex justify-content-center">
                <div class="card p-3">
                    <div class="d-flex align-items-center">
                        <div class="image me-2"> <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" class="rounded" width="155" /> </div>
                        <div class="ml-3 w-100">
                            <h4 class="mb-0 mt-0">Alex Morrision</h4> <span>Senior Journalist</span>
                            <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                                <div class="d-flex flex-column"> <span class="articles">Articles</span> <span class="number1">38</span> </div>
                                <div class="d-flex flex-column"> <span class="followers">Followers</span> <span class="number2">980</span> </div>
                                <div class="d-flex flex-column"> <span class="rating">Rating</span> <span class="number3">8.9</span> </div>
                            </div>
                            <div class="button mt-2 d-flex flex-row align-items-center"> <button class="btn btn-sm btn-outline-primary w-100">Chat</button> <button class="btn btn-sm btn-primary w-100 ml-2">Follow</button> </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* repeat  */}
            <div class="container mt-3 d-flex justify-content-center">
                <div class="card p-3">
                    <div class="d-flex align-items-center">
                        <div class="image me-2"> <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" class="rounded" width="155" /> </div>
                        <div class="ml-3 w-100">
                            <h4 class="mb-0 mt-0">Alex Morrision</h4> <span>Senior Journalist</span>
                            <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                                <div class="d-flex flex-column"> <span class="articles">Articles</span> <span class="number1">38</span> </div>
                                <div class="d-flex flex-column"> <span class="followers">Followers</span> <span class="number2">980</span> </div>
                                <div class="d-flex flex-column"> <span class="rating">Rating</span> <span class="number3">8.9</span> </div>
                            </div>
                            <div class="button mt-2 d-flex flex-row align-items-center"> <button class="btn btn-sm btn-outline-primary w-100">Chat</button> <button class="btn btn-sm btn-primary w-100 ml-2">Follow</button> </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container mt-3 d-flex justify-content-center">
                <div class="card p-3">
                    <div class="d-flex align-items-center">
                        <div class="image me-2"> <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" class="rounded" width="155" /> </div>
                        <div class="ml-3 w-100">
                            <h4 class="mb-0 mt-0">Alex Morrision</h4> <span>Senior Journalist</span>
                            <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                                <div class="d-flex flex-column"> <span class="articles">Articles</span> <span class="number1">38</span> </div>
                                <div class="d-flex flex-column"> <span class="followers">Followers</span> <span class="number2">980</span> </div>
                                <div class="d-flex flex-column"> <span class="rating">Rating</span> <span class="number3">8.9</span> </div>
                            </div>
                            <div class="button mt-2 d-flex flex-row align-items-center"> <button class="btn btn-sm btn-outline-primary w-100">Chat</button> <button class="btn btn-sm btn-primary w-100 ml-2">Follow</button> </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container mt-3 d-flex justify-content-center">
                <div class="card p-3">
                    <div class="d-flex align-items-center">
                        <div class="image me-2"> <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" class="rounded" width="155" /> </div>
                        <div class="ml-3 w-100">
                            <h4 class="mb-0 mt-0">Alex Morrision</h4> <span>Senior Journalist</span>
                            <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                                <div class="d-flex flex-column"> <span class="articles">Articles</span> <span class="number1">38</span> </div>
                                <div class="d-flex flex-column"> <span class="followers">Followers</span> <span class="number2">980</span> </div>
                                <div class="d-flex flex-column"> <span class="rating">Rating</span> <span class="number3">8.9</span> </div>
                            </div>
                            <div class="button mt-2 d-flex flex-row align-items-center"> <button class="btn btn-sm btn-outline-primary w-100">Chat</button> <button class="btn btn-sm btn-primary w-100 ml-2">Follow</button> </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Friends