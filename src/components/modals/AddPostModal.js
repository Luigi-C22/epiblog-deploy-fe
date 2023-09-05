import React, { useState } from "react";

const AddPostModal = () => {
	const [formData, setFormData] = useState({});

	const [file, setFile] = useState(null);

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};
		//viene prima uploaded il file 
	const uploadFile = async (image) => {
		const fileData = new FormData();
		fileData.append("cover", image);

		try {
			const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/cloudUpload`, {
				method: "POST",
				body: fileData,
			});
			return await response.json();
		} catch (error) {
			console.error("File upload errors occurred");
		}
	};
	//successivamente viene inviato il form con il file compreso
	const submitForm = async (e) => {
		e.preventDefault();

		if (file) {
			try {
				const uploadedFile = await uploadFile(file);
				console.log(uploadedFile);
				console.log(formData);
				const postFormData = {
					...formData,
					cover: uploadedFile.cover,
				};

				const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/posts/create`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(postFormData),
				});
				return response.json();
			} catch (error) {
				console.error("Failed to save the post");
			}
		} else {
			console.error("Please select at least one file to upload");
		}
	};

	return (
		<div className="h-screen w-screen fixed top-1/2 flex items-center left-1/2 transform -translate-y-1/2 -translate-x-1/2 backdrop-blur-md z-30">
			<div className="relative flex flex-col text-left shadow-xl bg-gray-600 text-black h-fit mx-auto -mt-1 rounded-xl animate-bounce-in xs:min-w-[80%] sm:min-w-[80%] md:min-w-[700px]">
				<div className="text-center mt-8 mb-4">
					<h1 className="font-bold text-xl mb-8 text-white">
						Scrivi un nuovo post
					</h1>
					<div className="mt-2 mb-2">
						<form
							onSubmit={submitForm}
							className="flex flex-col p-2 gap-2"
							encType="multipart/form-data"
						>
							<input
								type="text"
								name="category"
								placeholder="categoria"
								onChange={(e) =>
									setFormData({
										...formData,
										category: e.target.value,
									})
								}
							/>
							<input
								type="text"
								name="title"
								placeholder="titolo"
								onChange={(e) =>
									setFormData({
										...formData,
										title: e.target.value,
										readTime: {
											value: 0,
											unit: "minutes",
										},
									})
								}
							/>
							<input
								required
								type="file"
								name="cover"
								onChange={handleFileChange}
							/>
							<input
								type="text"
								name="author"
								placeholder="autore"
								onChange={(e) =>
									setFormData({
										...formData,
										author: e.target.value,
									})
								}
							/>
							<input  
								name="content"
								onChange={(e) =>
									setFormData({
										...formData,
										content: e.target.value,
									})
								}
							/>
							<button type="submit">Invia Post</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddPostModal;
