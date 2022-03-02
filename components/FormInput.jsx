const FormInput = ({ id, title, type, onChange }) => {
  return (
    <div className="w-3/4">
      <label htmlFor={id} className="text-lg text-gray-800">
        {title}
      </label>
      <br />
      <input
        type={type}
        id={id}
        onChange={onChange}
        className="w-full rounded-md bg-gray-200 p-2 shadow-md outline-none"
      />
    </div>
  )
}

export default FormInput
