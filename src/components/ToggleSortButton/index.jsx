const ToggleSortButton = ({ toggleSortOrder, sortAscending }) => {
    return (
        <button onClick={toggleSortOrder}>
            Toggle Sorting Order:{" "}
            {sortAscending ? "Ascending" : "Descending"}
        </button>
    );
};

export default ToggleSortButton;