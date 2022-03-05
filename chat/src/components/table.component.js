
import react from 'react';
import DataTable from 'react-data-table-component';

const Table = ({
    columns,
    data,
    title,
    pagination,
    selectableRows,
    pointerOnHover,
    theme,
    onRowClicked,
    actions
}) => {
    return (
        <DataTable
            title={title}
            columns={columns}
            data={data}
            pagination={pagination}
            selectableRows={selectableRows}
            pointerOnHover={pointerOnHover}
            theme={theme}
            onRowClicked={onRowClicked}
            actions={actions}
        />
    );
};

export default Table;