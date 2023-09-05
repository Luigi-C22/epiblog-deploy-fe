import React from "react";
import { Link } from "react-router-dom";

const SingleCard = ({ title, content, author, cover, id }) => {
	return (
		<article className="flex flex-col dark:bg-gray-900">
			<div>
				<img
					alt={title}
					className="object-cover w-full h-52 dark:bg-gray-500"
					src={cover}
				/>
			</div>
			<div className="flex flex-col flex-1 p-6">
				<h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
					{title}
				</h3>
				<p>{content?.slice(0, 40)}</p>
				<div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
					<span>
						Autore: {author?.name} {author?.surname}
					</span>
				</div>
				<div className="mt-4 flex justify-center items-center">
					<Link to={`/post/${id}`}>
						<button className="p-2 bg-gray-800 hover:bg-gray-700 w-full ">
							Leggi tutto
						</button>
					</Link>
				</div>
			</div>
		</article>
	);
};

export default SingleCard;
