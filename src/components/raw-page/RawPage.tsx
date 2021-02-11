import React, { useRef, useEffect, Fragment, useCallback } from 'react';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MyFab from '../common/my-wrappers/MyFab';
import AddIcon from '@material-ui/icons/AddOutlined';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import { rawActions, mainActions, commonActions } from '../../redux/actions';
import { connect } from 'react-redux';
import { saveAs } from 'file-saver';
import { EventMessage, MessageType, Company, Raw } from '../../interfaces/main';
import { Dialog, CreateRaw } from '../../interfaces/dialogs';
import CreateRawDialog from './dialogs/CreateRawDialog';
import CompanySelector from './CompanySelector';
import RawList from './RawList';
import { RootState } from '../../interfaces/root-state';
import { slugify } from 'transliteration';

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
      width: '100%'
    },
    button: {
      margin: theme.spacing(1),
    },
    hiddenInput: {
      display: 'none',
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

interface StateProps {
  currentCompany: string;
  addRaw: Dialog;
  companies: Company[];
  raws: Raw[];
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    currentCompany: state.common.currentCompany,
    companies: state.companiesPage.companies,
    addRaw: state.dialogs.addRaw
  };
};

interface Props extends StateProps {
  exportRaws(companyId: string): Promise<any>;
  importRaws(file: File, companyId: string): Promise<boolean>;
  addSnack(message: EventMessage): void;
  addRaw: Dialog;
  getCompanies(): Promise<void>;
  
}

interface Props {
  
  setDialogState(dialog: string, state: CreateRaw): void;
}



function RawPage(props: Props) {
  const classes = useStyles();
  const hiddenInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    props.getCompanies();
  }, []);

  const handleAddRaw = useCallback(() => {
    props.setDialogState('addRaw', { open: true, rawName: undefined, price: undefined });
  }, []);

  const handleGetRaws = async () => {
    const response = await props.exportRaws(props.currentCompany);
    const companyIndex = props.companies.findIndex(company => company._id === props.currentCompany);
    let fileName = 'common-ingredients';
    if (companyIndex !== -1) {
      fileName = slugify(props.companies[companyIndex].name);
    }
    saveAs(response, `${fileName}.xlsx`);
  };

  const handlePostRawsClick = () => {
    if (hiddenInput.current) {
      hiddenInput!.current.click();
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      const file = event.target.files[0];
      const success = await props.importRaws(file, props.currentCompany);

      if(success) {
        props.addSnack({message: <FormattedMessage id="rawImport.success" defaultMessage="Imported successfully" />, type: MessageType.success});
      } else {
        props.addSnack({message: <FormattedMessage id="rawImport.error" defaultMessage="Import failed" />, type: MessageType.warning});
      }

      // Reset input to be able to upload the same file again
      if (hiddenInput.current) {
        hiddenInput.current.value = '';
      }
    }
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <input type="file" name="file" ref={hiddenInput} onChange={handleFileSelect} className={classes.hiddenInput} />
      <div className={classes.buttonsContainer}>
        <CompanySelector />
        <Button onClick={handleGetRaws} color="primary" variant="outlined" className={classes.button}>
          <FormattedMessage id="rawPage.buttons.getRaws" defaultMessage="Get raw materials list" />
        </Button>
        <Button onClick={handlePostRawsClick} color="primary" variant="outlined" className={classes.button}>
          <FormattedMessage id="rawPage.buttons.putRaws" defaultMessage="Upload raw materials list" />
        </Button>
      </div>
      <RawList />
      <MyFab variant="extended" color="secondary" className={classes.fab} onClick={handleAddRaw}>
        <Fragment>
          <AddIcon className={classes.extendedIcon} />
          <FormattedMessage id="rawPage.fab.addRaw" defaultMessage="Create raw" />
        </Fragment>
      </MyFab>
      <CreateRawDialog />
    </Container>
  );
}

export default connect(
  mapStateToProps,
  {...rawActions, ...mainActions, ...commonActions}
)(RawPage);
