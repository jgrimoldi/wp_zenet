import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { Close } from '@mui/icons-material';

const style = {
    fontFamily: 'Montserrat',
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'rgba(0,0,0,0.7)',
    color: '#f9f9f9',
    border: '2px solid #F0443A',
    borderRadius: '2rem',
    boxShadow: 24,
    p: 4,
  };

  const button = {
    color: '#f1f1f1'
  }

const PopUp = ({ name, surname, show, close }) => (
    <Modal
        open={show}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Registro exitoso!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                El registro del usuario se ha completado correctamente!
            </Typography>
            <Button sx={button} onClick={close}><Close></Close> Cerrar </Button>
        </Box>
    </Modal>
);

export default PopUp;