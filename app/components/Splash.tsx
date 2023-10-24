import React from 'react';
import Card from '@mui/material/Card';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { archivo } from '../fonts';
import SplashCircleOfFifths from './SplashCircleOfFifths';

const Splash = () => {

	return (
		<div className='splash'>
			<Grid container item xs={12} sx={{
				display: 'flex',
				marginTop: '10px',
				height: '32em',
				'@media (max-width: 600px)': {
					height: '18em'
				},
			}}>
				<Card sx={{
					display: 'flex',
					justifyContent: 'center',
					width: '88vw',
					height: '30em',
					padding: 1,
					borderRadius: '.5em',
				// 	background: `
				// 	linear-gradient(45deg, rgba(0, 00, 0, .9) 0%, rgba(38, 50, 56, 0.8) 100%),
				// 	linear-gradient(-45deg, rgba(38, 50, 56, 0.8) 0%, rgba(200, 200, 100, 0.5) 20%)
				// `,
				background: `
				linear-gradient(105deg, rgba(0, 00, 0, 1) 0%, rgba(38, 50, 56, 0.8) 90%)
	
			`,
					border: '1px solid rgba(192,192,192,0.5)', 
					boxShadow: '0 0 10px 1px rgba(192,192,192,0.3)',
					'@media (max-width: 600px)': {
						height: '16em',
						width: '100vw',
					},

				}}>
					<Grid item xs={5.5} sm={5.5} md={6.5} sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						'@media (max-width: 600px)': {
							paddingLeft: 2
						},
					}}>
					
						<Box sx={{
							display: 'flex',
							flexDirection: 'column',
							borderRadius: '20px',
							// backgroundColor:'red',
						}}>
							<Typography variant='h2' component="h2"
								className={archivo.className}
								sx={{
									fontWeight: '700',
									background: 'white',
									paddingBottom: '12px',
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
									textTransform: 'uppercase',
									'@media (max-width: 1200px)': {
										fontSize: '3.5em'
									},
									'@media (max-width: 900px)': {
										fontSize: '2.5em'
									},
									'@media (max-width: 600px)': {
										fontSize: '1.1em',
									},
								}}>
								Find A Song&apos;s
								{/* Under Construction check back soon */}
							</Typography>
							<Typography variant='h2' component="h2"
								className={archivo.className}
								sx={{
									fontWeight: '600',
									fontSize: '3.2em',
									fontStyle: 'italic',
									background: 'linear-gradient(45deg, #fcfcfe 60%, #bdbdbd 100%)',
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
									// textTransform: 'uppercase',
									'@media (max-width: 1200px)': {
										fontSize: '3.2em'
									},
									'@media (max-width: 900px)': {
										fontSize: '2.2em'
									},
									'@media (max-width: 600px)': {
										fontSize: '1em',

									},
								}}>
								Key, Tempo, and Song Credits
							</Typography>
						</Box >



					</Grid>

					<Grid item xs={7} sm={6.5} md={4.5} sx={{
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'column',
					}}>
						<Card sx={{
							display: 'flex',
							justifyContent: 'center',
							textAlign: 'center',
							alignItems: 'center',
							backgroundColor: 'transparent',
							boxShadow: 0,
							height: '25em',
							'@media (max-width: 600px)': {
								alignItems: 'flex-start',
							},

						}}>
							<SplashCircleOfFifths />
						</Card>
						<Box sx={{
							display: 'flex',
							justifyContent: 'center',
							height: '5em',
							'@media (max-width: 600px)': {
								height: '1.2em'
							},

						}}>
							<Typography variant='h2' component="h2"
								className={archivo.className}
								sx={{
									textAlign:'center',
									fontWeight: '700',
									background: 'white',
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
									fontSize: '1.2em',
									paddingBottom: '5px',
									'@media (max-width: 600px)': {
										fontSize: '.8em',
										paddingBottom: '5px',
									},
								}}>
								Click on a key for a random song
							</Typography>
						</Box>
					</Grid>
				</Card>
			</Grid>
		</div>
	);
}
export default Splash;