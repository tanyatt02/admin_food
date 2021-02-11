import React, { useEffect, Fragment, useCallback, useState } from 'react';
import classNames from 'classnames';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { dialogActions, commonActions } from '../../redux/actions';
import MyFab from '../common/my-wrappers/MyFab';
import AddIcon from '@material-ui/icons/AddOutlined';
import { FormattedMessage } from 'react-intl';
import { Dialog, CreateUser, CreateCompany } from '../../interfaces/dialogs';
import { RootState } from '../../interfaces/root-state';
import CreateCompanyDialog from './dialogs/CreateCompanyDialog';
import { Company } from '../../interfaces/main';
import MyExpansionPanel from '../common/my-wrappers/MyExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import Typography from '@material-ui/core/Typography';
import CreateUserDialog from './dialogs/CreateUserDialog';
import MyButton from '../common/my-wrappers/MyButton';
import UsersTable from './UsersTable';
import DeleteUserDialog from './dialogs/DeleteUserDialog';
import EditIcon from '@material-ui/icons/EditOutlined';
import Fade from '@material-ui/core/Fade';
import MyIconButton from '../common/my-wrappers/MyIconButton';
import DeleteCompanyDialog from './dialogs/DeleteCompanyDialog';
import Tooltip from '@material-ui/core/Tooltip';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      paddingTop: 56,
      [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
        paddingTop: 48,
      },
      [theme.breakpoints.up('sm')]: {
        paddingTop: 64,
      },
    },
    expansionPanelContainer: {
      width: '100%',
      padding: `${theme.spacing(3)}px 0px`,
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
      },
    },
    grow: {
      flexGrow: 1,
    },
    panelSummary: {},
    panelSummaryContent: {},
    summaryIconButton: {
      margin: -12,
    },
    editButton: {
      marginLeft: theme.spacing(1),
      display: 'none',
      '$panelSummary:hover > $panelSummaryContent > &': {
        display: 'inherit',
        opacity: 0.5,
      },
      '$panelSummary:hover > $panelSummaryContent > &:hover': {
        opacity: 1,
      }
    },
    panelDetails: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    addUserButton: {
      marginTop: theme.spacing(3),
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
  addCompany: Dialog;
  companies: Company[];
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    addCompany: state.dialogs.addCompany,
    companies: state.companiesPage.companies,
  };
};

interface Props {
  addCompany: Dialog;
  companies: Company[];
  getCompanies(): Promise<void>;
  setDialogState(dialog: string, state: CreateCompany | CreateUser): void;
}

function CompaniesPage(props: Props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState([] as string[]);

  useEffect(() => {
    props.getCompanies();
  }, []);

  const handleAddCompany = useCallback(() => {
    props.setDialogState('addCompany', { open: true, company: undefined });
  }, []);

  const handleEditClick = (event: React.MouseEvent, data: Company) => {
    event.stopPropagation();
    props.setDialogState('addCompany', { open: true, company: data });
  }

  const handleDeleteClick = (event: React.MouseEvent, data: Company) => {
    event.stopPropagation();
    props.setDialogState('deleteCompany', { open: true, company: data });
  }

  const handleChange = useCallback((event, isExpanded, data) => {
    const expandedSet = new Set(expanded);
    if (isExpanded) {
      expandedSet.add(data);
    } else {
      expandedSet.delete(data);
    }
    setExpanded(Array.from(expandedSet));
  }, [expanded]);

  const handleAddUser = useCallback((event: React.MouseEvent, data: Company) => {
    props.setDialogState('addUser', { open: true, company: data, user: undefined });
  }, []);

  const expandedSet = new Set(expanded);

  return (
    <Container maxWidth="md" className={classes.root}>
      <div className={classes.expansionPanelContainer}>
        {props.companies.map(company => (
          <MyExpansionPanel key={company._id} data={company._id || ''} handleChange={handleChange}>
            <ExpansionPanelSummary classes={{ content: classes.panelSummaryContent }} className={classes.panelSummary}>
              <Typography >{company.name}</Typography>
                <MyIconButton className={classNames(classes.summaryIconButton, classes.editButton)} handleClick={handleEditClick} data={company}>
                  <EditIcon />
                </MyIconButton>
              <div className={classes.grow} />
              <Tooltip
                className={classes.summaryIconButton}
                title={<FormattedMessage id="companyPanel.tooltip.deleteCompanyDisabled" defaultMessage="Can't delete a company that has users. Delete its users first" />}
                disableFocusListener={company.users.length === 0}
                disableHoverListener={company.users.length === 0}
                disableTouchListener={company.users.length === 0}
                >
                <div>
                  <Fade in={!expandedSet.has(company._id || '')}>
                    <MyIconButton  handleClick={handleDeleteClick} data={company} disabled={company.users.length > 0}>
                      <DeleteIcon />
                    </MyIconButton>
                  </Fade>
                </div>
              </Tooltip>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.panelDetails}>
              <UsersTable company={company} users={company.users} />
              <MyButton
                variant="outlined"
                color="primary"
                size="small"
                handleClick={handleAddUser}
                data={company}
                className={classes.addUserButton}
              >
                <FormattedMessage id="companyPanelDetails.buttons.addUser" defaultMessage="Add user" />
              </MyButton>
            </ExpansionPanelDetails>
          </MyExpansionPanel>
        ))}
      </div>
      <MyFab variant="extended" color="secondary" className={classes.fab} onClick={handleAddCompany}>
        <Fragment>
          <AddIcon className={classes.extendedIcon} />
          <FormattedMessage id="companiesPage.fab.addCompany" defaultMessage="Create company" />
        </Fragment>
      </MyFab>
      <CreateCompanyDialog />
      <DeleteCompanyDialog />
      <CreateUserDialog />
      <DeleteUserDialog />
    </Container>
  );
}

export default connect(
  mapStateToProps,
  { ...commonActions, ...dialogActions },
)(CompaniesPage);
