
const NewCourse = () => {

    return (
        <>
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">NewCourse</a>
                    </p>
                </section>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" >
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create a new course</h1>
                    </div>
                    <form>
                        <div>
                            <label htmlFor="course" className="block text-sm font-medium leading-6 text-gray-900">
                                *Course:
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="course"
                                    autoComplete="off"
                                    onChange={(e) => setCourse(e.target.value)}
                                    value={course}
                                    required
                                    aria-describedby="course"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="owner" className="block text-sm font-medium leading-6 text-gray-900">
                                *Owner:
                            </label>
                            <input
                                type="text"
                                id="owner"
                                onChange={(e) => setOwner(e.target.value)}
                                value={owner}
                                required
                                aria-describedby="owner"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />

                            //TODO check if user exist
                            <div className="block text-sm font-medium leading-6 text-red-500">
                                <p>
                                    Owner has to be a user.<br />
                                </p>
                            </div>
                        </div>

                        <button
                            className={`bg-blue-700 text-white font-semibold py-2 px-4 rounded hover:bg-blue-800 hover:text-white"
                            }`}
                            type="submit"
                        >
                            Add
                        </button>
                    </form>
                    <p>
                        <span className="line">
                            <a href="/Home">Cancel</a>
                        </span>
                    </p>
                </div>
            )}
        </>
    )
}

export default NewCourse