import { useForm } from "react-hook-form";
import * as apiClient from '../api-client'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router";
import { Link } from "react-router";

export type RegisterFormData = {
 firstName: string
 lastName: string
 email: string
 password: string
 confirmPassword: string
}

const Register = () => {

 const queryClient = useQueryClient()
 const navigate = useNavigate()
 const { showToast } = useAppContext()

 const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>()

 const { mutate } = useMutation(
  {
   mutationFn: apiClient.register,
   onSuccess: async () => {
    // toast for playwright tests
    showToast({ message: 'Registration Successful!', type: 'SUCCESS' })
    // showToast({ message: 'Hello!, ' + data.userName + ' ' + 'you registered successfully!', type: 'SUCCESS' });
    await queryClient.invalidateQueries({
     queryKey: ['validateToken']
    });
    navigate('/')
   },
   onError: (err) => {
    showToast({ message: err.message, type: 'ERROR' })
   }
  })

 const onSubmit = handleSubmit((data) => { mutate(data) })

 return (
  <form onSubmit={onSubmit} className="container mx-auto  flex flex-col flex-1 gap-4">
   <h2 className="text-3xl text-gray-700 pt-8 pb-2 sm:pt-12 lg:px-10 font-bold">
    Create an Account
   </h2>

   <div className="flex flex-col md:flex-row lg:px-10 gap-4">
    <label className="flex-1 text-gray-700 font-semibold">
     First Name
     <input className={`border focus:border-2 ${errors.firstName ? " border-red-500 " : " border-blue-700"} rounded focus:outline-none w-full p-2 font-normal`} {...register('firstName', { required: '*First Name is required' })} />
     {errors.firstName && (
      <span className="text-red-600 text-xs flex justify-end -mt-7 mb-3 px-3">{errors.firstName.message}</span>
     )}
    </label>
    <label className="flex-1 text-gray-700 font-semibold">
     Last Name
     <input className={`border focus:border-2 ${errors.lastName ? "border-red-500" : "border-blue-700"} w-full rounded p-2 focus:outline-none font-normal`} {...register('lastName', { required: '*Last Name is required' })} />
     {errors.lastName && (
      <span className="text-red-600 text-xs flex justify-end -mt-7 mb-3 px-3">{errors.lastName.message}</span>
     )}
    </label>
   </div>

   <label className="flex flex-col text-gray-700 font-semibold lg:px-10">
    Email
    <input type="email" className={`border focus:border-2 ${errors.email ? "border-red-500" : "border-blue-700"} rounded p-2 w-full focus:outline-none font-normal`} {...register('email', { required: '*Email is required' })} />
    {errors.email && (
     <span className="text-red-600 text-xs flex justify-end -mt-7 mb-3 px-3">{errors.email.message}</span>
    )}
   </label>

   <div className="flex flex-col md:flex-row gap-4 lg:px-10">
    <label className="flex flex-1 flex-col text-gray-700 font-semibold">
     Password
     <input type="password" className={`border focus:border-2 ${errors.password ? "border-red-500" : "border-blue-700"} rounded p-2 focus:outline-none font-normal`} {...register('password', { required: '*Password is required', minLength: { value: 6, message: 'Password mush be atleast 6 chars' } })} />
     {errors.password && (
      <span className="text-red-600 text-xs flex justify-end -mt-7 mb-3 px-3">{errors.password.message}</span>
     )}
    </label>
    <label className="flex flex-1 flex-col text-gray-700 font-semibold">
     Confirm Password
     <input type="password" className={`border focus:border-2 ${errors.confirmPassword ? "border-red-500" : "border-blue-700"} rounded p-2 focus:outline-none font-norma`} {...register('confirmPassword', {
      validate: (val) => {
       if (!val) {
        return '*Confirm Password is required'
       } else if (val !== watch('password')) {
        return 'Your Passwords do not match'
       }
      }
     })} />
     {errors.confirmPassword && (
      <span className="text-red-600 text-xs flex justify-end -mt-7 mb-3 px-3">{errors.confirmPassword.message}</span>
     )}
    </label>
   </div>
   <span className="flex flex-col sm:flex-row justify-between gap-2 pt-5 pb-10 lg:px-10">
    <span className="flex justify-center py-5 sm:pt-5">Already have an account?
     <Link to='/sign-in' className="text-blue-900 font-bold px-2 underline">Sign-in</Link>
    </span>
    <button type="submit" className="bg-blue-700 py-2.5 px-4 sm:my-2 rounded text-white text-lg font-semibold hover:bg-blue-600">Create Account</button>
   </span>
  </form>
 )
}

export default Register;