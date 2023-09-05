import React, { useState } from "react";
import { useGetAllPostsQuery } from "../api/apiSlice";
import MainLayout from "../layouts/MainLayout";
import SingleCard from "../components/SingleCard";
import AddPostModal from "../components/modals/AddPostModal";
import { useSession } from "../middlewares/ProtectedRoutes";



const HomePage = () => {
	const {
		data: posts,
		isLoading: isPostLoading,
		isSuccess: isPostSuccess,
		isError: IsPostError,
	} = useGetAllPostsQuery({
		page: 1,
		pageSize: 6,
	});

	const session = useSession();
	console.log(session);

	const [showAddPostModal, setShowAddPostModal] = useState(false);

	const toggleModal = () => setShowAddPostModal(!showAddPostModal);

	
	return (
		<MainLayout>
			
			<section className="min-h-screen py-6 sm:py-12 dark:bg-gray-800 dark:text-gray-100">
				<div className="container p-6 mx-auto space-y-8">
					<div className="space-y-2 text-center">
						<div className="flex justify-center gap-4 items-center">
							<h2 className="text-3xl font-bold">Posts da mostrare</h2>
							<button
								onClick={toggleModal}
								className="p-2 bg-yellow-500 rounded"
							>
								Scrivi Post
							</button>
						</div>
						<p className="font-serif text-sm dark:text-gray-400">
							Qualisque erroribus usu at, duo te agam soluta mucius.
						</p>
					</div>
					<div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
						{isPostSuccess &&
							!isPostLoading &&
							posts?.posts?.map((item) => {
								return (
									<SingleCard
										key = {item._id}
										id = {item._id}
										title = {item.title}
										cover = {item.cover}
										author = {item.author}
										content = {item.content}
									/>
								);
							})}
					</div>
					
				</div>
				{showAddPostModal && <AddPostModal close={toggleModal}/>}
			</section>
		</MainLayout>
	);
};

export default HomePage;
