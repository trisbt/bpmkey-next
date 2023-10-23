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
				background: 'linear-gradient(rgba(100,100,100,.5) 50%, transparent)',
				height: '25em',
				'@media (max-width: 600px)': {
					height: '15em'
				},
			}}>
				<Grid item xs={5.5} sm={6} md={7} sx={{
					display: 'flex',
					justifyContent: 'center',
					background: 'linear-gradient(125deg, rgba(100,100,200,.3) 0%, transparent 40%)',
					// backdropFilter: 'blur(1px)',
					width: '100vw',
					// height: '15em',
				}}>
					<Card sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'center',
						paddingLeft: 18,
						// textAlign: 'center',
						// width: '80vw',
						backgroundColor: 'transparent',
						// backdropFilter: 'blur(3px)',
						boxShadow: 0,
						// height: '15em',
						'@media (max-width: 900px)': {
							paddingLeft: 8
						},
						'@media (max-width: 600px)': {
							paddingLeft: 3
						},


					}}>
						<Box sx={{
							display: 'flex',
							flexDirection: 'column',
							// justifyContent: 'center',
							// backgroundColor: 'blue',
							height: '12em',
							// width:'30em',

						}}>
							<Typography variant='h2' component="h2"
								className={archivo.className}
								sx={{
									// display: 'flex',
									// alignItems: 'center',
									fontWeight: '700',
									background: 'white',
									// background: 'linear-gradient(45deg, #fcfcfe 60%, #bdbdbd 100%)',
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
										fontSize: '1.2em',
										paddingBottom: '5px',
									},
								}}>
								Find A Song&apos;s
								{/* Under Construction check back soon */}
							</Typography>
							<Typography variant='h2' component="h2"
								className={archivo.className}
								sx={{
									// display: 'flex',
									// alignItems: 'center',
									fontWeight: '400',
									color: '#fcfcfc',
									fontStyle:'italic',
									// background: 'linear-gradient(45deg, #fcfcfe 60%, #bdbdbd 100%)',
									// WebkitBackgroundClip: 'text',
									// WebkitTextFillColor: 'transparent',
									textTransform: 'uppercase',
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
								Key, Tempo, and Credits
							</Typography>
						</Box>

					</Card>
				</Grid>

				<Grid item xs={6.5} sm={6} md={4} sx={{
					display: 'flex',
					justifyContent: 'center',
					// background: 'linear-gradient(230deg, rgba(205,100,00,.3) 0%, transparent 40%)',
					// backgroundColor:'red',
					// width: '25em',
					height: '19em',
				}}>
					<Card sx={{
						display: 'flex',
						justifyContent: 'center',
						textAlign: 'center',
						alignItems: 'center',
						backgroundColor: 'transparent',
						// backdropFilter: 'blur(3px)',
						boxShadow: 0,
						height: '25em',
						'@media (max-width: 600px)': {
							height: '22em'
						},

					}}>
						<SplashCircleOfFifths />
					</Card>
				</Grid>
			</Grid>
		</div>
	);
}
export default Splash;