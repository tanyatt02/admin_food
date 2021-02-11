import React, { useRef, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import { commonTablesActions } from '../../redux/actions';
import { connect } from 'react-redux';
import { saveAs } from 'file-saver';
import { EventMessage, MessageType, Company } from '../../interfaces/main';
import TableSelector from './TableSelector';
import TableItemsList from './TableItemsList';
import { RootState } from '../../interfaces/root-state';
import { slugify } from 'transliteration';
import { CommonTable } from '../../interfaces/shared/api';
import { AnimalNutrient, Nutrient } from '../../interfaces/shared/model-interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      WebkitOverflowScrolling: 'touch',
      paddingTop: 56,
      [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
        paddingTop: 48,
      },
      [theme.breakpoints.up('sm')]: {
        paddingTop: 64,
      },
    },
    buttonsContainer: {
      display: 'flex',
      paddingTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      width: '100%',
    },
    button: {
      margin: theme.spacing(1),
    },
    hiddenInput: {
      display: 'none',
    },
  }),
);

interface StateProps {
  tables: CommonTable[];
  currentTable: number;
  currentTableItems: Array<AnimalNutrient | Nutrient>;
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    tables: state.commonTables.commonTables,
    currentTable: state.commonTables.currentTable || 0,
    currentTableItems: state.commonTables.currentTableItems,
  };
};

interface Props extends StateProps {
  getCommonTables(): Promise<CommonTable[]>;
  getCommonTable(table: CommonTable): Promise<void>;
  setCurrentTable(tableIndex: number): void;
  exportCommonTable(table: CommonTable): Promise<any>;
}

function CommonTablesPage(props: Props) {
  const classes = useStyles();
  const hiddenInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function init() {
      const tables = await props.getCommonTables();
      if (tables) {
        props.getCommonTable(tables[0]);
        props.setCurrentTable(0);
      }
    }

    init();
  }, []);

  const handleExportTable = async () => {
    const table = props.tables[props.currentTable];
    const response = await props.exportCommonTable(table);
    const fileName = slugify(table);
    saveAs(response, `${fileName}.xlsx`);
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <input
        type="file"
        name="file"
        ref={hiddenInput}
        // onChange={handleFileSelect}
        className={classes.hiddenInput}
      />
      <div className={classes.buttonsContainer}>
        <TableSelector />
        <Button onClick={handleExportTable} color="primary" variant="outlined" className={classes.button}>
          <FormattedMessage id="commonTablesPage.buttons.exportTable" defaultMessage="Download as xlsx" />
        </Button>
        {/*<Button onClick={handlePostRawsClick} color="primary" variant="outlined" className={classes.button}>
          <FormattedMessage id="rawPage.buttons.putRaws" defaultMessage="Upload raw materials list" />
        </Button> */}
      </div>
      <TableItemsList />
    </Container>
  );
}

export default connect(mapStateToProps, commonTablesActions)(CommonTablesPage);
