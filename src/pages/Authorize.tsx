/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router";

type Student = {
  id_num: string;
  event_code: string;
};
export default function Authorize() {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [student, setStudent] = useState<Student>({
    id_num: "",
    event_code: "",
  });
  const navigate = useNavigate();

  const authAssignedStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsloading(true);
      const res = await api.post("/students/authorize");

      if (res.data?.authorized) {
        navigate("/scanner");
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    } finally {
      setIsloading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent({ id_num: "", event_code: "", [name]: value });
  };
  return (
    <div className="bg-card shadow-lg rounded-lg p-6 w-80 md:min-w-100">
      <div className="w-50 mx-auto">
        <img
          src="/public/images/logo.png"
          alt="Logo"
          className="object-cover"
        />
      </div>
      <form onClick={authAssignedStudent}>
        <div className="flex flex-col space-y-2 mb-3">
          <label htmlFor="id-numeberr" className="text-secondary font-semibold">
            ID-Number
          </label>
          <input
            type="text"
            className=" p-2 border border-secondary-foreground  rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            name="id-number"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col space-y-2 my-3">
          <label htmlFor="id-numeberr" className="text-secondary font-semibold">
            Event Code
          </label>
          <input
            type="text"
            className=" p-2 border border-secondary-foreground  rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            name="event code"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className={`${isLoading ? "opacity-70" : "bg-primary text-white font-bold cursor-pointer hover:bg-primary/50"} w-full rounded-lg py-3 px-4 `}
          disabled={isLoading}
        >
          {isLoading ? "Authorizing..." : "Authorize"}
        </button>
      </form>
    </div>
  );
}
