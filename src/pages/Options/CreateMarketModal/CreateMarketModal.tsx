import React, { useState, memo, FC } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useTranslation } from 'react-i18next';

import Modal from '@material-ui/core/Modal';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

import { ReactComponent as CloseCrossIcon } from 'assets/images/close-cross.svg';

import ROUTES, { navigateTo } from 'constants/routes';
import { lightTheme } from 'styles/theme';
import colors from 'styles/theme/colors';
import { headingH3CSS, headingH6CSS } from 'components/Typography/Heading';
import { bodyMediumCSS } from 'components/Typography/Body';
import NumericInput from 'components/Input/NumericInput';
import NumericInputWithCurrency from 'components/Input/NumericInputWithCurrency';
import { formLabelLargeCSS } from 'components/Typography/Form';

import { GridDivCol, resetButtonCSS, GridDivRow, FlexDivRowCentered } from 'shared/commonStyles';

import { CurrencyKey, SYNTHS_MAP } from 'constants/currency';
import DatePicker from 'components/Input/DatePicker';
import Select from 'components/Select';
import { ValueType } from 'react-select';
import { media } from 'shared/media';

/*
sAUDKey,
			initialTargetPrice,
			[creationTime + biddingTime, creationTime + timeToMaturity],
			[initialLongBid, initialShortBid],
			{ from: initialBidder }
*/

const StyledSlider = withStyles({
	root: {
		color: colors.green,
		height: 16,
	},
	thumb: {
		height: 24,
		width: 24,
		background: colors.white,
		boxShadow: '0px 1px 4px rgba(202, 202, 241, 0.5)',
		'&:focus, &:hover, &$active': {
			boxShadow: '0px 1px 4px rgba(202, 202, 241, 0.5)',
		},
	},
	track: {
		height: 16,
		borderRadius: 2,
	},
	rail: {
		height: 16,
		backgroundColor: colors.red,
		opacity: 1,
		borderRadius: 2,
	},
})(Slider);

export const CreateMarketModal: FC = memo(() => {
	const { t } = useTranslation();
	const [currencyKey, setCurrencyKey] = useState<ValueType<{ value: string; label: string }>>();
	const [strikePrice, setStrikePrice] = useState<number | string>('');
	const [endOfBidding, setEndOfBidding] = useState<Date | null | undefined>(null);
	const [maturityDate, setMaturityDate] = useState<Date | null | undefined>(null);
	const [initialLongShorts, setInitialLongShorts] = useState<{ long: number; short: number }>({
		long: 50,
		short: 50,
	});
	const [initialFundingAmount, setInitialFundingAmount] = useState<number | string>('');
	// from
	// if the values are x, y (where x+y=1), then the bids are x * funding y * funding

	const handleClose = () => navigateTo(ROUTES.Options.Home);

	return (
		<ThemeProvider theme={lightTheme}>
			<StyledModal
				open={true}
				onClose={handleClose}
				disableEscapeKeyDown={true}
				disableAutoFocus={true}
				disableEnforceFocus={true}
				hideBackdrop={true}
				disableRestoreFocus={true}
			>
				<Container>
					<CloseButton>
						<CloseCrossIcon onClick={handleClose} />
					</CloseButton>
					<Title>{t('options.create-market-modal.title')}</Title>
					<Subtitle>{t('options.create-market-modal.subtitle')}</Subtitle>
					<Content>
						<MarketDetails>
							<FormRow>
								<FormControlGroup>
									<FormControl>
										<FormInputLabel htmlFor="asset">
											{t('options.create-market-modal.details.select-asset-label')}
										</FormInputLabel>
										<Select
											options={[
												{
													label: 'BTC',
													value: 'BTC',
												},
											]}
											placeholder="e.g. BTC"
											value={currencyKey}
											onChange={(option) => {
												setCurrencyKey(option);
											}}
										/>
									</FormControl>
									<FormControl>
										<FormInputLabel htmlFor="strike-price">
											{t('options.create-market-modal.details.strike-price-label')}
										</FormInputLabel>
										<StyledNumericInput
											id="strike-price"
											value={strikePrice}
											onChange={(e) => setStrikePrice(e.target.value)}
											placeholder="e.g. $10000.00 USD"
										/>
									</FormControl>
								</FormControlGroup>
							</FormRow>
							<FormRow>
								<FormControlGroup>
									<FormControl>
										<FormInputLabel htmlFor="end-of-bidding">
											{t('options.create-market-modal.details.bidding-end-date-label')}
										</FormInputLabel>
										<StyledDatePicker
											id="end-of-bidding"
											selected={endOfBidding}
											onChange={(d) => setEndOfBidding(d)}
										/>
									</FormControl>
									<FormControl>
										<FormInputLabel htmlFor="maturity-date">
											{t('options.create-market-modal.details.market-maturity-date-label')}
										</FormInputLabel>
										<StyledDatePicker
											id="maturity-date"
											selected={maturityDate}
											onChange={(d) => setMaturityDate(d)}
										/>
									</FormControl>
								</FormControlGroup>
							</FormRow>
							<FormRow>
								<FormControl>
									<FlexDivRowCentered>
										<FormInputLabel style={{ cursor: 'default' }}>
											{t('options.create-market-modal.details.long-short-skew-label')}
										</FormInputLabel>
										<div>
											<Longs>{t('common.val-in-cents', { val: initialLongShorts.long })}</Longs>
											{' / '}
											<Shorts>{t('common.val-in-cents', { val: initialLongShorts.short })}</Shorts>
										</div>
									</FlexDivRowCentered>
									<StyledSlider
										value={initialLongShorts.long}
										onChange={(_, newValue) => {
											const long = newValue as number;
											setInitialLongShorts({
												long,
												short: 100 - long,
											});
										}}
									/>
								</FormControl>
							</FormRow>
							<FormRow>
								<FormControl>
									<FormInputLabel htmlFor="funding-amount">
										{t('options.create-market-modal.details.funding-amount-label')}
									</FormInputLabel>
									<StyledNumericInputWithCurrency
										currencyKey={SYNTHS_MAP.sUSD}
										value={initialFundingAmount}
										onChange={(e) => setInitialFundingAmount(e.target.value)}
										inputProps={{
											id: 'funding-amount',
										}}
									/>
								</FormControl>
							</FormRow>
						</MarketDetails>
						<MarketSummary>
							<MarketSummaryTitle>
								{t('options.create-market-modal.summary.title')}
							</MarketSummaryTitle>
						</MarketSummary>
					</Content>
				</Container>
			</StyledModal>
		</ThemeProvider>
	);
});

const Container = styled.div`
	background-color: ${(props) => props.theme.colors.surfaceL1};
	text-align: center;
	outline: none;
`;

const StyledModal = styled(Modal)`
	background-color: ${(props) => props.theme.colors.surfaceL1};
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 1;
	${media.medium`
		display: block;
		padding: 80px 24px;
	`}
	overflow: auto;
`;

const Title = styled.div`
	${headingH3CSS};
	color: ${(props) => props.theme.colors.fontPrimary};
	padding-bottom: 8px;
`;

const Subtitle = styled.div`
	${bodyMediumCSS};
	color: ${(props) => props.theme.colors.fontSecondary};
	padding-bottom: 57px;
	max-width: 520px;
	margin: 0 auto;
`;

const Content = styled(GridDivCol)`
	grid-gap: 57px;
	${media.large`
		grid-auto-flow: row;
	`}
`;

const MarketDetails = styled.div`
	width: 570px;
	${media.medium`
		width: 100%;
	`}
`;

const MarketSummary = styled.div`
	width: 330px;
	${media.medium`
		width: 100%;
	`}
`;

const FormInputLabel = styled.label`
	${formLabelLargeCSS};
	color: ${(props) => props.theme.colors.fontSecondary};
	text-align: left;
	cursor: pointer;
`;

const FormRow = styled.div`
	padding-bottom: 24px;
`;

const FormControlGroup = styled(GridDivCol)`
	grid-gap: 24px;
	grid-template-columns: 1fr 1fr;
	${media.medium`
		grid-template-columns: unset;
		grid-auto-flow: row;
	`}
`;

const FormControl = styled(GridDivRow)`
	grid-gap: 8px;
`;

const Longs = styled.span`
	${headingH6CSS};
	color: ${(props) => props.theme.colors.green};
`;
const Shorts = styled.span`
	${headingH6CSS};
	color: ${(props) => props.theme.colors.red};
`;

const MarketSummaryTitle = styled.div`
	text-align: center;
	background-color: ${(props) => props.theme.colors.surfaceL3};
	height: 48px;
`;

const CloseButton = styled.button`
	${resetButtonCSS};
	position: absolute;
	right: 5%;
	top: 5%;
	color: ${({ theme }) => theme.colors.fontTertiary};
`;

const StyledDatePicker = styled(DatePicker)`
	.react-datepicker__input-container input {
		border-color: transparent;
	}
`;

const StyledNumericInput = styled(NumericInput)`
	border-color: transparent;
`;

const StyledNumericInputWithCurrency = styled(NumericInputWithCurrency)`
	.input {
		border-top-color: transparent;
		border-bottom-color: transparent;
		border-right-color: transparent;
	}

	.currency-container {
		border-color: transparent;
	}
`;

export default CreateMarketModal;