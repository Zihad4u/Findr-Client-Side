import { Link, useLoaderData } from "react-router-dom";
import { AutoContext } from "../Authprovider/AuthContext";
import { useContext, useRef, useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { toast } from "react-toastify";

const Details = () => {
    const Data = useLoaderData();

    const { loading, user } = useContext(AutoContext);
    const { name, image, description, upvoteCount, tags, externalLinks, _id } = Data;
    const [voteCount, setVoteCount] = useState(upvoteCount);
    const textAreaRef = useRef(null); // Create a ref for the textarea
    const textAreaRef2 = useRef(null); // Create a ref for the textarea

    const handleUpvote = () => {
        setVoteCount(voteCount + 1);
    };
    const { displayName, email } = user;
    const handleReview = (e) => {
        e.preventDefault();
        const reviewStar = e.target.reviews.value;
        const message = e.target.textReview.value;
        // console.log(reviewStar, message, displayName, email);
        const Data = { reviewStar, message, displayName, email, _id }
        console.log(Data)
        fetch('http://localhost:5000/addReview', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(Data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged == true) {
                    toast.success('Add review successfully')
                }
                console.log(data)
            })
            .catch(error => {
                toast.error('You already add review on this product')
                console.log(error)
            })
        textAreaRef.current.value = "";
        textAreaRef2.current.value = "";
    };

    return (
        <>
            {loading ? (
                <span className="loading loading-spinner text-neutral"></span>
            ) : (
                <div className="px-4">
                    <div className="w-full h-[680px] mt-4 md:flex pb-14">
                        {/* left side div */}
                        <div className="md:w-[50%] w-[100%] h-full flex justify-center items-center">
                            <img className="w-full rounded-xl object-cover h-full" src={image} alt="" />
                        </div>
                        {/* right side */}
                        <div className="md:w-[50%] mt-3 sm:mt-0 w-[100%] h-full sm:pl-5 bg-[#FFF]">
                            <h3 className="m-0 sm:text-[40px] text-[20px] font-bold text-[#131313]"></h3>
                            <p className="text-[20px] font-medium text-[#424242]">
                                Name : <span>{name}</span>
                            </p>
                            <hr />
                            <p className="text-[20px] font-medium text-[#424242]"></p>
                            <hr className="text-white" />
                            <p className="font-normal text-[#5a5a5a] text-[16px]">
                                <span className="text-[#131313] font-bold">Description :</span>{description}
                            </p>
                            <hr />
                            <div className="lg:flex sm:gap-5 mt-3">
                                <button
                                    disabled={voteCount > upvoteCount}
                                    onClick={handleUpvote}
                                    className="btn flex flex-col"
                                >
                                    <FaArrowAltCircleUp className="" />
                                    {voteCount}
                                </button>
                                <p className="font-medium btn rounded-full text-[#23BE0A]">
                                    Tag:<>{tags}</>
                                </p>
                                <p className="font-medium mt-3 lg:mt-0 btn rounded-full text-red-700">
                                    Report<></>
                                </p>
                            </div>
                            <div className="mt-4">
                                <div className="flex gap-[98px] mt-4">
                                    <p className="text-[#5a5a5a] font-medium">
                                        External links:{" "}
                                        <a
                                            className="ml-2 text-blue-500 hover:border-b-2 hover:border-blue-500"
                                            href={externalLinks}
                                        >
                                            {externalLinks}
                                        </a>{" "}
                                    </p>

                                    <p className="text-[#131313] sm:text-[16px] text-[10px] font-semibold"></p>
                                </div>
                                {/* handle review */}
                                <form onSubmit={handleReview} className="mt-5">
                                    <div className="relative w-full">
                                        <select
                                            name="reviews"
                                            className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                                            defaultValue=""
                                            required
                                            ref={textAreaRef}
                                        >
                                            <option value="" disabled hidden>
                                                Give Star Rating
                                            </option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                    <textarea
                                        required
                                        placeholder="Write your review"
                                        rows="5"
                                        name="textReview"
                                        className="w-full p-2 mt-3 shadow-xl border rounded-md"
                                        ref={textAreaRef2} // Attach the ref to the textarea
                                    ></textarea>
                                    <button type="submit" className="btn">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Details;
