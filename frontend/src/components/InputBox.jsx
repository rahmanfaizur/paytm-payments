// Functional component for rendering an input box with a label
export function InputBox({ label, placeholder, onChange }) {
  return (
    <div>
      {/* Label for the input box */}
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      {/* Input box with placeholder text and onChange handler */}
      <input 
        onChange={onChange} 
        placeholder={placeholder} 
        className="w-full px-2 py-1 border rounded border-slate-200" 
      />
    </div>
  );
}
