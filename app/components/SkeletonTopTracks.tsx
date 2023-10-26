import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const SkeletonTopTracks = () => {
	return (
		<Box >
			<Grid container item xs={12} justifyContent='center' alignItems='center' >
						{/* text row */}
						<Grid item xs={11} md={8}>
							<Card
								sx={{
									display: 'flex',
									flexDirection: 'row',
									margin: '0px 10px 0',
									boxShadow: 3,
									justifyContent: 'center',
									backgroundColor: 'rgb(0, 71, 212, .6)',
								}}
							>
								<Typography variant='h4'
									sx={{
										display: 'flex',
										alignItems: 'center',
										color: '#e8eaf6',
										fontWeight: 'bold',
										background: '#e8eaf6',
										WebkitBackgroundClip: 'text',
										WebkitTextFillColor: 'transparent',
										letterSpacing: '1px',
										borderRadius: '2px',
										'@media (max-width: 600px)': {
											fontSize: '24px'
										},
									}}>
									Daily Top Tracks
								</Typography>
							</Card>
						</Grid>

						{/* main search */}
						{Array.from({ length: 10 }).map((_, index) => (

							<Grid item xs={11} md={8} key={index}>
								{/* each card */}
									<Card
										sx={{
											display: 'flex',
											flexDirection: 'row',
											margin: '10px 10px 0',
											boxShadow: 3,
											"&:hover": {
												backgroundColor: "#e0e0e0",
											}
										}}
									>
										<CardContent sx={{
											width: '80vw',
											paddingBottom: '15px',
											'&:last-child': {
												paddingBottom: '15px',
											}
										}}>
											<Grid container >
												{/* image */}
												<Grid item xs={3} sm={2} >
													<Skeleton
														width={100}
														height={150}
													/>
												</Grid>
												{/* song info */}				
											</Grid>
										</CardContent>
									</Card>
					
							</Grid>
						))}
			</Grid >
		</Box>
	);
}


