export const Sidebar = ({ title, children }) => {
  return <aside className="bg-slate-900 w-1/4 h-full mt-10 p-10 rounded-r-3xl fixed">
    <h2 className="text-slate-50 text-2xl font-medium mb-5 capitalize">{title}</h2>
    {children}
  </aside>;
};