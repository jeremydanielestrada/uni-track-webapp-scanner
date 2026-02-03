export default function Authorize() {
  return (
    <div className="bg-card shadow-lg rounded-lg p-8 w-80 md:w-100">
      <form>
        <div className="flex flex-col space-y-2 my-3">
          <label htmlFor="id-numeberr" className="text-secondary font-semibold">
            ID-Number
          </label>
          <input
            type="text"
            placeholder="eg. 200-00000"
            className=" p-2 border border-secondary-foreground  rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="flex flex-col space-y-2 my-3">
          <label htmlFor="id-numeberr" className="text-secondary font-semibold">
            Event Code
          </label>
          <input
            type="text"
            placeholder="eg. 200-00000"
            className=" p-2 border border-secondary-foreground  rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg py-3 px-4 bg-primary text-white font-bold cursor-pointer hover:bg-primary/50"
        >
          Proceed
        </button>
      </form>
    </div>
  );
}
