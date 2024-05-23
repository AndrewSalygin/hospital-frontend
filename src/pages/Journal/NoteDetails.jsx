import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Card, Spinner, Alert, Button, Modal, Form } from 'react-bootstrap';
import axios from '../../api/axiosConfig';

const NoteDetails = ({ isAdmin = false }) => {
  const { noteId, patientId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [patient, setPatient] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [diseaseDetails, setDiseaseDetails] = useState({});
  const [treatmentDetails, setTreatmentDetails] = useState({});
  const [medications, setMedications] = useState({});
  const [medicalProcedures, setMedicalProcedures] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDiseases, setExpandedDiseases] = useState({});
  const [showDiseaseModal, setShowDiseaseModal] = useState(false);
  const [diseaseId, setDiseaseId] = useState('');
  const [treatmentName, setTreatmentName] = useState('');
  const [currentTreatmentId, setCurrentTreatmentId] = useState('');
  const [showTreatmentModal, setShowTreatmentModal] = useState(false);
  const [diseaseForTreatment, setDiseaseForTreatment] = useState('');
  const [showMedicationModal, setShowMedicationModal] = useState(false);
  const [medicationId, setMedicationId] = useState('');
  const [medicationAmount, setMedicationAmount] = useState('');
  const [medicationInstructions, setMedicationInstructions] = useState('');
  const [showProcedureModal, setShowProcedureModal] = useState(false);
  const [procedureId, setProcedureId] = useState('');
  const [procedureAmount, setProcedureAmount] = useState('');
  const [procedureInstructions, setProcedureInstructions] = useState('');
  const [diseaseList, setDiseaseList] = useState([]);
  const [medicationList, setMedicationList] = useState([]);
  const [procedureList, setProcedureList] = useState([]);
  const [showAnamnesisModal, setShowAnamnesisModal] = useState(false);
  const [anamnesis, setAnamnesis] = useState('');
  const [showUpdateResultModal, setShowUpdateResultModal] = useState(false);
  const [resultsOfTreatment, setResultsOfTreatment] = useState('');
  const [selectedDiseaseId, setSelectedDiseaseId] = useState('');
  const [selectedTreatmentId, setSelectedTreatmentId] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [newRecipeMedicationId, setNewRecipeMedicationId] = useState('');
  const [newRecipeExpirationDate, setNewRecipeExpirationDate] = useState('');
  const [showTreatmentCostModal, setShowTreatmentCostModal] = useState(false);
  const [treatmentCost, setTreatmentCost] = useState(null);

  useEffect(() => {
    const fetchNoteDetails = async () => {
      try {
        const noteResponse = await axios.get(`/journal-patient/${noteId}`);
        setNote(noteResponse.data);

        const patientResponse = await axios.get(`/patients/${patientId}`);
        setPatient(patientResponse.data);

        const doctorResponse = await axios.get(`/doctors/${noteResponse.data.doctorId}`);
        setDoctor(doctorResponse.data);

        const diseaseResponses = await Promise.all(noteResponse.data.diseaseList.map(disease =>
          axios.get(`/diseases/${disease.diseaseId}`)
        ));
        const treatmentResponses = await Promise.all(noteResponse.data.diseaseList.map(disease =>
          axios.get(`/treatments/${disease.treatmentId}`).catch(() => null)
        ));

        const fetchedDiseaseDetails = diseaseResponses.reduce((acc, response) => {
          acc[response.data.diseaseId] = response.data;
          return acc;
        }, {});
        const fetchedTreatmentDetails = treatmentResponses.reduce((acc, response) => {
          if (response) {
            acc[response.data.treatmentId] = response.data;
          }
          return acc;
        }, {});

        setDiseaseDetails(fetchedDiseaseDetails);
        setTreatmentDetails(fetchedTreatmentDetails);

        const medicationsResponses = await Promise.all(noteResponse.data.diseaseList.map(disease =>
          disease.treatmentId ? axios.get(`/treatments/medications/${disease.treatmentId}`) : Promise.resolve({ data: [] })
        ));
        const medicalProceduresResponses = await Promise.all(noteResponse.data.diseaseList.map(disease =>
          disease.treatmentId ? axios.get(`/treatments/medicalProcedures/${disease.treatmentId}`) : Promise.resolve({ data: [] })
        ));

        const fetchedMedications = medicationsResponses.reduce((acc, response, index) => {
          const treatmentId = noteResponse.data.diseaseList[index].treatmentId;
          if (treatmentId) {
            acc[treatmentId] = response.data;
          }
          return acc;
        }, {});

        const fetchedMedicalProcedures = medicalProceduresResponses.reduce((acc, response, index) => {
          const treatmentId = noteResponse.data.diseaseList[index].treatmentId;
          if (treatmentId) {
            acc[treatmentId] = response.data;
          }
          return acc;
        }, {});

        setMedications(fetchedMedications);
        setMedicalProcedures(fetchedMedicalProcedures);

        // Fetch recipes
        const recipesResponse = await axios.get(`/journal-patient/note/recipe/${noteId}`);
        setRecipes(recipesResponse.data);
      } catch (error) {
        setError('Не удалось получить детали записи');
      } finally {
        setLoading(false);
      }
    };

    fetchNoteDetails();
  }, [noteId, patientId]);

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await axios.get('/diseases', { params: { limit: -1, offset: 0 } });
        setDiseaseList(response.data);
      } catch (error) {
        console.error('Не удалось получить список болезней', error);
      }
    };

    const fetchMedications = async () => {
      try {
        const response = await axios.get('/medications', { params: { limit: -1, offset: 0 } });
        setMedicationList(response.data);
      } catch (error) {
        console.error('Не удалось получить список медикаментов', error);
      }
    };

    const fetchProcedures = async () => {
      try {
        const response = await axios.get('/medicalProcedures', { params: { limit: -1, offset: 0 } });
        setProcedureList(response.data);
      } catch (error) {
        console.error('Не удалось получить список медицинских процедур', error);
      }
    };

    fetchDiseases();
    fetchMedications();
    fetchProcedures();
  }, []);

  const toggleDiseaseDetails = (diseaseId) => {
    setExpandedDiseases((prevState) => ({
      ...prevState,
      [diseaseId]: !prevState[diseaseId],
    }));
  };

  const handleAddDiseaseAndTreatment = async () => {
    try {
      const treatmentResponse = await axios.post(`/treatments`, null, {
        params: {
          treatmentName,
          doctorId: doctor.doctorId
        }
      });
      const treatmentId = treatmentResponse.data.id;
      setCurrentTreatmentId(treatmentId);

      await axios.post(`/journal-patient/note/treatment/${noteId}`, null, {
        params: {
          diseaseId,
          treatmentId
        }
      });
      setShowDiseaseModal(false);
      const noteResponse = await axios.get(`/journal-patient/${noteId}`);
      setNote(noteResponse.data);
    } catch (error) {
      setError('Не удалось добавить болезнь или лечение');
    }
  };

  const handleAddMedication = async () => {
    try {
      await axios.post(`/treatments/medications/${currentTreatmentId}`, null, {
        params: {
          medicationId,
          amount: medicationAmount,
          doctorInstructions: medicationInstructions
        }
      });
      setShowMedicationModal(false);
      const response = await axios.get(`/treatments/medications/${currentTreatmentId}`);
      setMedications(prevState => ({
        ...prevState,
        [currentTreatmentId]: response.data
      }));
    } catch (error) {
      setError('Не удалось добавить медикамент');
    }
  };

  const handleAddProcedure = async () => {
    try {
      await axios.post(`/treatments/medicalProcedures/${currentTreatmentId}`, null, {
        params: {
          procedureId,
          amount: procedureAmount,
          doctorInstructions: procedureInstructions
        }
      });
      setShowProcedureModal(false);
      const response = await axios.get(`/treatments/medicalProcedures/${currentTreatmentId}`);
      setMedicalProcedures(prevState => ({
        ...prevState,
        [currentTreatmentId]: response.data
      }));
    } catch (error) {
      setError('Не удалось добавить медицинскую процедуру');
    }
  };

  const handleUpdateAnamnesis = async () => {
    try {
      await axios.patch(`/journal-patient/note/anamnesis/${noteId}`, null, {
        params: { anamnesis }
      });
      setShowAnamnesisModal(false);
      const noteResponse = await axios.get(`/journal-patient/${noteId}`);
      setNote(noteResponse.data);
    } catch (error) {
      setError('Не удалось обновить анамнез');
    }
  };

  const handleUpdateResultsOfTreatment = async () => {
    try {
      await axios.patch(`/journal-patient/note/treatment/${noteId}`, null, {
        params: { diseaseId: selectedDiseaseId, treatmentId: selectedTreatmentId, resultsOfTreatment }
      });
      setShowUpdateResultModal(false);
      const noteResponse = await axios.get(`/journal-patient/${noteId}`);
      setNote(noteResponse.data);
    } catch (error) {
      setError('Не удалось обновить результаты лечения');
    }
  };

  const handleDeleteDisease = async (diseaseId) => {
    try {
      await axios.delete(`/journal-patient/note/disease/${noteId}`, { params: { diseaseId } });
      const noteResponse = await axios.get(`/journal-patient/${noteId}`);
      setNote(noteResponse.data);
    } catch (error) {
      setError('Не удалось удалить болезнь');
    }
  };

  const handleDeleteTreatment = async (diseaseId, treatmentId) => {
    try {
      await axios.delete(`/journal-patient/note/treatment/${noteId}`, { params: { diseaseId, treatmentId } });
      const noteResponse = await axios.get(`/journal-patient/${noteId}`);
      setNote(noteResponse.data);
    } catch (error) {
      setError('Не удалось удалить лечение');
    }
  };

  const handleDeleteMedication = async (treatmentId, medicationId) => {
    try {
      await axios.delete(`/treatments/medications/${treatmentId}/${medicationId}`);
      const response = await axios.get(`/treatments/medications/${treatmentId}`);
      setMedications(prevState => ({
        ...prevState,
        [treatmentId]: response.data
      }));
    } catch (error) {
      setError('Не удалось удалить медикамент');
    }
  };

  const handleDeleteProcedure = async (treatmentId, procedureId) => {
    try {
      await axios.delete(`/treatments/medicalProcedures/${treatmentId}/${procedureId}`);
      const response = await axios.get(`/treatments/medicalProcedures/${treatmentId}`);
      setMedicalProcedures(prevState => ({
        ...prevState,
        [treatmentId]: response.data
      }));
    } catch (error) {
      setError('Не удалось удалить медицинскую процедуру');
    }
  };

  const handleAddRecipe = async () => {
    try {
      await axios.post(`/patients/recipes/${patientId}`, null, {
        params: {
          medicationId: newRecipeMedicationId,
          expirationDate: newRecipeExpirationDate,
          medicalHistoryNoteId: noteId
        }
      });
      setShowRecipeModal(false);
      const recipesResponse = await axios.get(`/journal-patient/note/recipe/${noteId}`);
      setRecipes(recipesResponse.data);
    } catch (error) {
      setError('Не удалось выписать рецепт');
    }
  };

  const handleFetchTreatmentCost = async (treatmentId) => {
    try {
      const response = await axios.get(`/treatments/price/${treatmentId}`);
      setTreatmentCost(response.data[0]);
      setShowTreatmentCostModal(true);
    } catch (error) {
      setError('Не удалось получить стоимость лечения');
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 d-flex justify-content-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const backLink = isAdmin ? `/admin/patients/${patientId}/notes` : `/patients/${patientId}/notes`;

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="shadow-lg border-0 rounded-3" style={{ maxWidth: '700px', width: '100%' }}>
        <Card.Body className="p-5">
          <h2 className="mb-4">Детали записи</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <p><strong>Пациент:</strong> {patient ? `${patient.lastName} ${patient.firstName} ${patient.middleName}` : 'Загрузка...'}</p>
          <p><strong>Дата рождения:</strong> {patient ? patient.dateOfBirth : 'Загрузка...'}</p>
          <p><strong>Пол:</strong> {patient ? patient.gender : 'Загрузка...'}</p>
          <p><strong>Доктор:</strong> {doctor ? `${doctor.lastName} ${doctor.firstName} ${doctor.middleName}` : 'Загрузка...'}</p>
          <p><strong>Первичный приём:</strong> {note.initialAdmission ? 'Да' : 'Нет'}</p>
          <p><strong>Выписка:</strong> {note.discharge ? 'Да' : 'Нет'}</p>
          <p><strong>Статус пациента:</strong> {note.patientStatus}</p>
          <p><strong>Дата и время приёма:</strong> {new Date(note.admissionDateTime).toLocaleString()}</p>
          <p>
            <strong>Анамнез:</strong> {note.anamnesis} 
            <Button variant="link" onClick={() => {
              setAnamnesis(note.anamnesis);
              setShowAnamnesisModal(true);
            }}>Изменить</Button>
          </p>
          <h3 className="mt-4">Список болезней</h3>
          <Button variant="success" className="mb-3" onClick={() => setShowDiseaseModal(true)}>Добавить болезнь и лечение</Button>
          {note.diseaseList.length === 0 ? (
            <p>Нет записей о болезнях</p>
          ) : (
            <ul>
              {note.diseaseList.map((disease) => (
                <li key={disease.diseaseId}>
                  <Button
                    variant="link"
                    onClick={() => toggleDiseaseDetails(disease.diseaseId)}
                    aria-controls={`disease-details-${disease.diseaseId}`}
                    aria-expanded={expandedDiseases[disease.diseaseId]}
                  >
                    ({diseaseDetails[disease.diseaseId] ? diseaseDetails[disease.diseaseId].diseaseName + ' лечение' : 'Новое лечение'}) (нажмите для {expandedDiseases[disease.diseaseId] ? 'сворачивания' : 'раскрытия'})
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteDisease(disease.diseaseId)}>Удалить болезнь</Button>
                  {expandedDiseases[disease.diseaseId] && (
                    <div id={`disease-details-${disease.diseaseId}`} className="mt-2">
                      <p><strong>Название болезни:</strong> {diseaseDetails[disease.diseaseId] ? diseaseDetails[disease.diseaseId].diseaseName : 'Загрузка...'}</p>
                      <p><strong>Код болезни:</strong> {diseaseDetails[disease.diseaseId] ? diseaseDetails[disease.diseaseId].diseaseCode : 'Загрузка...'}</p>
                      {disease.treatmentId ? (
                        <>
                          <p>
                            <strong>Лечение:</strong> {treatmentDetails[disease.treatmentId] ? treatmentDetails[disease.treatmentId].treatmentName : 'Загрузка...'}
                            <Button variant="link" onClick={() => {
                              setSelectedDiseaseId(disease.diseaseId);
                              setSelectedTreatmentId(disease.treatmentId);
                              setResultsOfTreatment(disease.resultsOfTreatment);
                              setShowUpdateResultModal(true);
                            }}>Изменить результат лечения</Button>
                            <Button variant="primary" onClick={() => handleFetchTreatmentCost(disease.treatmentId)}>
                              Стоимость лечения
                            </Button>
                          </p>
                          <p><strong>Результаты лечения:</strong> {disease.resultsOfTreatment}</p>
                          <h4 className="mt-3">Медикаменты</h4>
                          <Button variant="success" onClick={() => {
                            setCurrentTreatmentId(disease.treatmentId);
                            setShowMedicationModal(true);
                          }}>Добавить медикамент</Button>
                          {medications[disease.treatmentId] ? (
                            medications[disease.treatmentId].length > 0 ? (
                              <ul>
                                {medications[disease.treatmentId].map(medication => (
                                  <li key={medication.medicationId}>
                                    {medication.medicationName} - {medication.dosage} - {medication.doctorInstructions}
                                    <br/>
                                    <Button variant="danger" size="sm" onClick={() => handleDeleteMedication(disease.treatmentId, medication.medicationId)}>Удалить</Button>
                                  </li>
                                ))}
                              </ul>
                            ) : <p>Нет медикаментов для этого лечения</p>
                          ) : <p>Загрузка...</p>}
                          <h4 className="mt-3">Медицинские процедуры</h4>
                          <Button variant="success" onClick={() => {
                            setCurrentTreatmentId(disease.treatmentId);
                            setShowProcedureModal(true);
                          }}>Добавить медицинскую процедуру</Button>
                          {medicalProcedures[disease.treatmentId] ? (
                            medicalProcedures[disease.treatmentId].length > 0 ? (
                              <ul>
                                {medicalProcedures[disease.treatmentId].map(procedure => (
                                  <li key={procedure.medicalProcedureId}>
                                    {procedure.medicalProcedureName} - {procedure.doctorInstructions}
                                    <br/>
                                    <Button variant="danger" size="sm" onClick={() => handleDeleteProcedure(disease.treatmentId, procedure.medicalProcedureId)}>Удалить</Button>
                                  </li>
                                ))}
                              </ul>
                            ) : <p>Нет медицинских процедур для этого лечения</p>
                          ) : <p>Загрузка...</p>}
                        </>
                      ) : (
                        <>
                          <Button variant="primary" onClick={() => {
                            setDiseaseForTreatment(disease.diseaseId);
                            setShowTreatmentModal(true);
                          }}>Добавить лечение</Button>
                        </>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
          <h3 className="mt-4">Выписанные рецепты</h3>
          <Button variant="success" className="mb-3" onClick={() => setShowRecipeModal(true)}>Выписать рецепт</Button>
          {recipes.length === 0 ? (
            <p>Нет выписанных рецептов</p>
          ) : (
            <ul>
              {recipes.map((recipe) => (
                <li key={recipe.recipeId}>
                  <p><strong>Название медикамента:</strong> {recipe.medicationName}</p>
                  <p><strong>Форма медикамента:</strong> {recipe.medicationForm}</p>
                  <p><strong>Дозировка:</strong> {recipe.dosage}</p>
                  <p><strong>Дата назначения:</strong> {new Date(recipe.admissionDateTime).toLocaleDateString()}</p>
                  <p><strong>Дата окончания действия:</strong> {new Date(recipe.expirationDate).toLocaleDateString()}</p>
                  <p><strong>Доктор:</strong> {recipe.doctorLastName} {recipe.doctorFirstName} {recipe.doctorMiddleName}</p>
                </li>
              ))}
            </ul>
          )}
          <Button variant="secondary" onClick={() => navigate(backLink)}>
            Вернуться назад
          </Button>
        </Card.Body>
      </Card>

      {/* Модальное окно для добавления болезни и лечения */}
      <Modal show={showDiseaseModal} onHide={() => setShowDiseaseModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить болезнь и лечение</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="diseaseId">
              <Form.Label>Болезнь</Form.Label>
              <Form.Control
                as="select"
                value={diseaseId}
                onChange={(e) => setDiseaseId(e.target.value)}
              >
                <option value="">Выберите болезнь</option>
                {diseaseList.map(disease => (
                  <option key={disease.diseaseId} value={disease.diseaseId}>
                    {disease.diseaseName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="treatmentName">
              <Form.Label>Название лечения</Form.Label>
              <Form.Control
                type="text"
                value={treatmentName}
                onChange={(e) => setTreatmentName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDiseaseModal(false)}>
            Отмена
          </Button>
          <Button variant="success" onClick={handleAddDiseaseAndTreatment}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Модальное окно для добавления медикамента */}
      <Modal show={showMedicationModal} onHide={() => setShowMedicationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить медикамент</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="medicationId">
              <Form.Label>Медикамент</Form.Label>
              <Form.Control
                as="select"
                value={medicationId}
                onChange={(e) => setMedicationId(e.target.value)}
              >
                <option value="">Выберите медикамент</option>
                {medicationList.map(medication => (
                  <option key={medication.medicationId} value={medication.medicationId}>
                    {medication.medicationName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="medicationAmount">
              <Form.Label>Количество дней</Form.Label>
              <Form.Control
                type="number"
                value={medicationAmount}
                onChange={(e) => setMedicationAmount(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="medicationInstructions">
              <Form.Label>Указания врача</Form.Label>
              <Form.Control
                type="text"
                value={medicationInstructions}
                onChange={(e) => setMedicationInstructions(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMedicationModal(false)}>
            Отмена
          </Button>
          <Button variant="success" onClick={handleAddMedication}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Модальное окно для добавления медицинской процедуры */}
      <Modal show={showProcedureModal} onHide={() => setShowProcedureModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить медицинскую процедуру</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="procedureId">
              <Form.Label>Медицинская процедура</Form.Label>
              <Form.Control
                as="select"
                value={procedureId}
                onChange={(e) => setProcedureId(e.target.value)}
              >
                <option value="">Выберите процедуру</option>
                {procedureList.map(procedure => (
                  <option key={procedure.medicalProcedureId} value={procedure.medicalProcedureId}>
                    {procedure.medicalProcedureName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="procedureAmount">
              <Form.Label>Количество</Form.Label>
              <Form.Control
                type="number"
                value={procedureAmount}
                onChange={(e) => setProcedureAmount(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="procedureInstructions">
              <Form.Label>Указания врача</Form.Label>
              <Form.Control
                type="text"
                value={procedureInstructions}
                onChange={(e) => setProcedureInstructions(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProcedureModal(false)}>
            Отмена
          </Button>
          <Button variant="success" onClick={handleAddProcedure}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Модальное окно для изменения анамнеза */}
      <Modal show={showAnamnesisModal} onHide={() => setShowAnamnesisModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Изменить анамнез</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="anamnesis">
              <Form.Label>Анамнез</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={anamnesis}
                onChange={(e) => setAnamnesis(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAnamnesisModal(false)}>
            Отмена
          </Button>
          <Button variant="success" onClick={handleUpdateAnamnesis}>
            Изменить
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Модальное окно для изменения результатов лечения */}
      <Modal show={showUpdateResultModal} onHide={() => setShowUpdateResultModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Изменить результаты лечения</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="resultsOfTreatment">
              <Form.Label>Результаты лечения</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={resultsOfTreatment}
                onChange={(e) => setResultsOfTreatment(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateResultModal(false)}>
            Отмена
          </Button>
          <Button variant="success" onClick={handleUpdateResultsOfTreatment}>
            Изменить
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Модальное окно для выписки рецепта */}
      <Modal show={showRecipeModal} onHide={() => setShowRecipeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Выписать рецепт</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newRecipeMedicationId">
              <Form.Label>Медикамент</Form.Label>
              <Form.Control
                as="select"
                value={newRecipeMedicationId}
                onChange={(e) => setNewRecipeMedicationId(e.target.value)}
              >
                <option value="">Выберите медикамент</option>
                {medicationList.map(medication => (
                  <option key={medication.medicationId} value={medication.medicationId}>
                    {medication.medicationName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="newRecipeExpirationDate">
              <Form.Label>Дата окончания действия рецепта</Form.Label>
              <Form.Control
                type="date"
                value={newRecipeExpirationDate}
                onChange={(e) => setNewRecipeExpirationDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRecipeModal(false)}>
            Отмена
          </Button>
          <Button variant="success" onClick={handleAddRecipe}>
            Выписать
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Модальное окно для отображения стоимости лечения */}
      <Modal show={showTreatmentCostModal} onHide={() => setShowTreatmentCostModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Стоимость лечения</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {treatmentCost ? (
            <>
              <p><strong>Общая стоимость медикаментов:</strong> {treatmentCost.totalMedicationsCost ? treatmentCost.totalMedicationsCost : 0}</p>
              <p><strong>Общая стоимость медицинских процедур:</strong> {treatmentCost.totalMedicalProceduresCost ? treatmentCost.totalMedicalProceduresCost : 0 }</p>
              <p><strong>Общая стоимость:</strong> {treatmentCost.totalCost ? treatmentCost.totalCost : 0 }</p>
            </>
          ) : (
            <p>Загрузка...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTreatmentCostModal(false)}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NoteDetails;
