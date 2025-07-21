export default function PhotoSearch({ searchText, setSearchText }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchText}
        onChange={e => { 
            console.log(e.target.value);
            setSearchText(e.target.value) }}
        style={{ width: '100%', padding: 8, fontSize: 16 }}
      />
    </div>
  );
}