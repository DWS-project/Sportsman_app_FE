import FavoriteIcon from '@mui/icons-material/Favorite'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import CardActions from '@mui/material/CardActions'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import { red } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GET_SPORT_HALLS } from 'src/constants/endpoints'
import { HTTPStatusCodes } from 'src/constants/statusCodes'
import withMainFrame from 'src/hoc/withMainFrame'

import useStyles from './styles'

const ListOfSportHalls = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [sporthalls, setSportHalls] = useState([])

  useEffect(() => {
    async function getAllSportHalls() {
      const { data, status } = await axios.get(GET_SPORT_HALLS)
      if (status === HTTPStatusCodes.OK) setSportHalls(data.reverse())
    }
    getAllSportHalls()
  }, [])

  return withMainFrame(
    <Grid container spacing={2} className={classes.container}>
      {sporthalls.map((sporthall, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            sx={{ maxWidth: 345 }}
            className={classes.cardWrapper}
            onClick={() => navigate(`/sport-hall/${sporthall.id}`)}
          >
            <Box position="relative">
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: red[500] }}
                    src={'/images/defaultUserImage.jpg'}
                    aria-label="recipe"
                  />
                }
                title={sporthall.title}
                subheader={sporthall.city ? sporthall.city : ''}
                className={classes.text}
              />
              <CardMedia
                component="img"
                height="194"
                image={
                  sporthall.pictures ? sporthall.pictures : '/images/logo.svg'
                }
                alt="Paella dish"
              />
              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className={classes.text}
                >
                  {sporthall.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  Zaprati teren
                </Typography>
              </CardActions>
              {sporthall.status === 'closed' && (
                <Box component="div" className={classes.ribbon}>
                  <Typography variant="body2" color="text.secondary">
                    Zatvoreno
                  </Typography>
                </Box>
              )}
              {sporthall.status === 'featured' && (
                <Box component="div" className={classes.featuredRibbon}>
                  <Typography variant="body2" color="text.secondary">
                    Istaknuto
                  </Typography>
                </Box>
              )}
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default ListOfSportHalls
