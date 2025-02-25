use std::str::FromStr;

#[cfg(test)]
use fake::Dummy;
use indexmap::IndexMap;
#[cfg(feature = "profiling")]
use tracing::instrument;

#[cfg(test)]
use super::IndexMapFaker;
use crate::{FileFormat, helpers};

use super::{CapabilitiesCanonical, DotComplex, Filters};

#[derive(Debug, Default, Clone)]
#[cfg_attr(test, derive(Dummy))]
pub struct DotCanonical {
  #[cfg_attr(test, dummy(faker = "IndexMapFaker"))]
  pub filters: IndexMap<Filters, CapabilitiesCanonical>,
}

impl TryFrom<DotComplex> for DotCanonical {
  type Error = Vec<chumsky::error::Simple<char>>;
  #[cfg_attr(feature = "profiling", instrument)]
  fn try_from(value: DotComplex) -> Result<Self, Self::Error> {
    let mut filters = value.filters.into_iter().map(|(k, v)| Filters::from_str(&k).map(|f| (f, Into::into(v))));
    if filters.any(|o| o.is_err()) {
      return Err(filters.filter(Result::is_err).filter_map(Result::err).flatten().collect());
    }
    Ok(Self {
      filters: filters.map(|o| o.unwrap()).collect(),
    })
  }
}

impl DotCanonical {
  #[cfg_attr(feature = "profiling", instrument)]
  pub(crate) fn parse(value: &str, format: FileFormat) -> Result<Self, Vec<helpers::ParseError>> {
    DotComplex::parse(value, format).map(TryInto::try_into).map(|d| d.unwrap())
  }
}
